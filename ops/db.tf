resource "random_password" "master_password" {
  length = 16
  special = false
}
resource "aws_db_subnet_group" "dbsubnet" {
  name = "${local.name}_dbsubnet"
  subnet_ids = [for s in aws_subnet.private: s.id]
  tags = local.tags
}

resource "aws_rds_cluster" "db" {
  cluster_identifier = local.name
  engine = "aurora-postgresql"
  engine_mode = "serverless"
  engine_version = "10.7"
  database_name = "mealplanner"
  skip_final_snapshot = true
  master_username = "postgres"
  master_password = random_password.master_password.result
  db_subnet_group_name = aws_db_subnet_group.dbsubnet.name
  vpc_security_group_ids = [aws_security_group.public_db.id]
  enable_http_endpoint = true

  scaling_configuration {
    auto_pause               = true
    max_capacity             = 16
    min_capacity             = 2
    seconds_until_auto_pause = 3600
    timeout_action           = "ForceApplyCapacityChange"
  }
  tags = local.tags
}
