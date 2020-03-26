data "aws_availability_zones" "available" {}

variable "az_count" {
  type = number
  description = "number of availability zones we'd like to launch in"
  default = 2 # we need a minimum of 2 for alb to work
}

resource "aws_vpc" "main" {
  cidr_block = "172.17.0.0/16"
  enable_dns_hostnames = true
  tags = local.tags
}

resource "aws_subnet" "private" {
  count = var.az_count

  cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  vpc_id = aws_vpc.main.id
  tags = merge(local.tags, {
    "kubernetes.io/cluster/${local.name}" = "shared"
  })
}


resource "aws_subnet" "public" {
  count = var.az_count

  cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 8, var.az_count+count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  vpc_id = aws_vpc.main.id
  map_public_ip_on_launch = true
  tags = merge(local.tags, {
    "kubernetes.io/cluster/${local.name}" = "shared"
  })
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags = local.tags
}

resource "aws_route" "tubes" {
  route_table_id = aws_vpc.main.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.igw.id
}

resource "aws_eip" "ngw" {
  count = var.az_count
  vpc = true
  depends_on = [aws_internet_gateway.igw]
}

resource "aws_nat_gateway" "ngw" {
  count = var.az_count

  subnet_id = aws_subnet.public[count.index].id
  allocation_id = aws_eip.ngw[count.index].id
  tags = local.tags
}

resource "aws_route_table" "ngw_private" {
  count = var.az_count
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.ngw[count.index].id
  }
}

resource "aws_route_table_association" "ngw_private" {
  count = var.az_count
  subnet_id = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.ngw_private[count.index].id
}
resource "aws_cloudwatch_log_group" "flowgroup" {
  name = "${local.name}_flowlogs"
}
resource "aws_iam_role" "log_role" {
  name = "${local.name}_log_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "log_role_policy" {
  name = "${local.name}_log_role_policy"
  role = aws_iam_role.log_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}
resource "aws_flow_log" "logs" {
  iam_role_arn = aws_iam_role.log_role.arn
  log_destination = aws_cloudwatch_log_group.flowgroup.arn
  traffic_type = "ALL"
  vpc_id = aws_vpc.main.id
}
