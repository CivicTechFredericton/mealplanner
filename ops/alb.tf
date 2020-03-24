resource "aws_lb" "backend" {
  name = "${local.name}-lb"
  subnets = [for s in aws_subnet.public: s.id]
  security_groups = [aws_security_group.lb.id]
  tags = local.tags
}

resource "aws_lb_target_group" "backend" {
  name = local.name
  port = 80
  protocol = "HTTP"
  vpc_id = aws_vpc.main.id
  target_type = "ip"
  tags = local.tags
}

resource "aws_lb_listener" "backend" {
  load_balancer_arn = aws_lb.backend.arn
  port = 80
  protocol = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }

}
