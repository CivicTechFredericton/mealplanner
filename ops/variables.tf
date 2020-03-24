variable backend_port {
  type = number
  default = 4000
  description = "port to access the service"
}

variable backend_image {
  type = string
  default = "vagmi/mealplanner_backend:latest"
  description = "image for backend service"
}
variable app_count {
  type = number
  default = 2
  description = "number of instances of the app that should run"
}
