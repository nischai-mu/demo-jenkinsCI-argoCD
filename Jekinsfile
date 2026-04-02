pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        ACCOUNT_ID = "949185033669"
        REPO_NAME = "demo-app"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/nischai-mu/demo-jenkinsCI-argoCD.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t $REPO_NAME:$IMAGE_TAG .
                    """
                }
            }
        }

        stage('Authenticate to ECR') {
            steps {
                script {
                    sh """
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin \
                    $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                    """
                }
            }
        }

        stage('Tag Image') {
            steps {
                script {
                    sh """
                    docker tag $REPO_NAME:$IMAGE_TAG \
                    $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    sh """
                    docker push \
                    $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPO_NAME:$IMAGE_TAG
                    """
                }
            }
        }
    }
}
