resource "aws_security_group" "lb" {
  name = "${local.name}_alb"
  description = "inbound access to port 80"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol = "tcp"
    from_port = 80
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = local.tags
}

resource "aws_security_group" "public_db" {
  name = "${local.name}_db"
  description = "inbound access to port 5432"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol = "tcp"
    from_port = 5432
    to_port = 5432
    security_groups = [aws_security_group.ecs_jobs.id, aws_security_group.bastion.id]
    # change this to app security groups after testing
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = local.tags
}

resource "aws_security_group" "bastion" {
  name = "${local.name}_bastion"
  description = "allow SSH access from the world"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol = "tcp"
    from_port = 22
    to_port = 22
    cidr_blocks = ["0.0.0.0/0"]
    # change this to app security groups after testing
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = local.tags
}

resource "aws_security_group" "ecs_jobs" {
  name = "${local.name}_jobs"
  description = "allow access from alb"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol = "tcp"
    from_port = var.backend_port
    to_port = var.backend_port
    security_groups = [aws_security_group.lb.id]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = local.tags
}

