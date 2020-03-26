output "master_password" {
  value = random_password.master_password.result
}

output "db_endpoint" {
  value = aws_rds_cluster.db.endpoint
}

output "lb_endpoint" {
  value = aws_lb.backend.dns_name
}

output "bastion_address" {
  value = aws_instance.bastion.public_dns
}

output "bastion_ip" {
  value = aws_instance.bastion.public_ip
}

output "kubeconfig" {
  value = "${local.kubeconfig}"
}
