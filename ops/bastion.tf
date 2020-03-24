data "local_file" "ssh_key" {
  filename = "${path.module}/ssh_key"
}

resource "aws_key_pair" "bastion_key" {
  key_name_prefix = "${local.name}_bastion"
  public_key = data.local_file.ssh_key.content
}

resource "aws_instance" "bastion" {
  ami           = "ami-04ac550b78324f651"
  instance_type = "t2.micro"
  security_groups = [aws_security_group.bastion.id]
  key_name = aws_key_pair.bastion_key.key_name
  subnet_id = aws_subnet.public[0].id
  associate_public_ip_address = true
  source_dest_check = false
  tags = local.tags
}
