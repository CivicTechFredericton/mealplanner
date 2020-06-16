provider "aws" { }
  
resource "random_password" "master_password" {
  length = 16
  special = false
}

resource "aws_db_instance" "sample" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "12.2"
  instance_class       = "db.t3.micro"
  name                 = "mealplanner"
  username             = "postgres"
  password             = random_password.master_password.result
  publicly_accessible  = true
}

output "master_password" {
  value = random_password.master_password.result
}
output "db_endpoint" {
  value = aws_db_instance.sample.address
}
