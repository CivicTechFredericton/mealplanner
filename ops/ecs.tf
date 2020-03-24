data "aws_iam_policy_document" "ecs_task_execution_role" {
  version = "2012-10-17"
  statement {
    sid = ""
    effect = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "${local.name}_ecs_role"
  assume_role_policy = data.aws_iam_policy_document.ecs_task_execution_role.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_cluster" "main" {
  name = local.name
  tags = local.tags
}

resource "aws_cloudwatch_log_group" "mealplanner" {
  name = "${local.name}-ecs"
}

resource "aws_ecs_task_definition" "backend" {
  family = "app"
  network_mode = "awsvpc"
  tags = local.tags

  # check valid values from
  # https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
  requires_compatibilities = ["FARGATE"]
  cpu = 512 # 0.5vCPU
  memory = 1024 # 512 Megs of RAM
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn

  # needs to be valid JSON
  container_definitions = <<DEFINITION
  [
    {
      "cpu": 512,
      "memory": 1024,
      "image": "${var.backend_image}",
      "name": "postgraphile",
      "network_mode": "awsvpc",
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${local.name}-ecs",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "postgraphile"
        }
      },
      "environment": [
        {
          "name": "DATABASE_URI",
          "value": "postgres://postgres:${random_password.master_password.result}@${aws_rds_cluster.db.endpoint}/mealplanner?sslmode=prefer"
        }
      ],
      "portMappings": [
        {
          "containerPort": ${var.backend_port},
          "hostPort": ${var.backend_port}
        }
      ]
    }
  ]
  DEFINITION
}


resource "aws_ecs_service" "backend" {
  name = local.name

  cluster = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count = var.app_count
  launch_type = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.ecs_jobs.id]
    subnets = [for s in aws_subnet.private: s.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name = "postgraphile"
    container_port = var.backend_port
  }

  tags = local.tags

  depends_on = [aws_lb_listener.backend]
}
