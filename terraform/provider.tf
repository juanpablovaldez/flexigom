provider "aws" {

}

terraform {
  backend "s3" {
    bucket = "flexigom-tf-actions"
    region = "us-east-1"
    key    = "github-actions/terraform.tfstate"
    encrypt = true
    dynamodb_table = "flexigom-tf-actions-lock"
  }
}