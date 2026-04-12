pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-1"
        REPO_NAME = "demo-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Cleanup Docker') {
            steps {
                sh 'docker system prune -a -f || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${REPO_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Authenticate, Tag & Push to ECR') {
            steps {
                withCredentials([string(credentialsId: 'aws-account-id', variable: 'ACCOUNT_ID')]) {
                    sh '''
                    # Construct ECR registry dynamically
                    ECR_REGISTRY=${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

                    echo "Logging into ECR..."
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login --username AWS --password-stdin $ECR_REGISTRY

                    echo "Tagging Docker image..."
                    docker tag ${REPO_NAME}:${IMAGE_TAG} \
                    $ECR_REGISTRY/${REPO_NAME}:${IMAGE_TAG}

                    echo "Pushing image to ECR..."
                    docker push $ECR_REGISTRY/${REPO_NAME}:${IMAGE_TAG}
                    '''
                }
            }
        }
        stage('Trigger GitLab CD') {
           steps {
              withCredentials([string(credentialsId: 'gitlab-trigger-token', variable: 'GITLAB_TRIGGER_TOKEN')]) {
                  sh """
                  curl -X POST \
                  --form token=${GITLAB_TRIGGER_TOKEN} \
                  --form ref=main \
                  --form variables[IMAGE_TAG]=${IMAGE_TAG} \
                  "https://gitlab.com/api/v4/projects/81234850/trigger/pipeline"
                  """
                  }
              }
         }
    }
}


