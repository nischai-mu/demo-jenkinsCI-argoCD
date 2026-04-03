pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        ACCOUNT_ID = "949185033669"
        REPO_NAME = "demo-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        ECR_REGISTRY = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh """
                docker system prune -a -y
                docker build -t ${REPO_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage('Authenticate to ECR') {
            steps {
                sh """
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin ${ECR_REGISTRY}
                """
            }
        }

        stage('Tag Image') {
            steps {
                sh """
                docker tag ${REPO_NAME}:${IMAGE_TAG} \
                ${ECR_REGISTRY}/${REPO_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Push to ECR') {
            steps {
                sh """
                docker push ${ECR_REGISTRY}/${REPO_NAME}:${IMAGE_TAG}
                """
            }
        }
    }
}



