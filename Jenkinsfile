pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'DockerHub'
        DOCKERHUB_REPO = 'mkradius/journeylingua'
        DOCKER_IMAGE_TAG = 'latest'
    }
    
    stages {
        stage("Checkout") {
            steps {
                git branch: 'main', credentialsId: 'GitHub', url: 'https://github.com/MKRadius/JourneyLingua.git'
            }
        }

        stage("Build") {
            steps {
                script {
                    dir('frontend') {
                        bat 'npm install'
                    }
                    dir('backend') {
                        bat 'npm install'
                    }
                }
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    bat 'docker build -t journeylingua .'
                }
            }
        }

        stage("Push Docker Image to DockerHub") {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS_ID) {
                        docker.image("${DOCKERHUB_REPO}:${DOCKER_IMAGE_TAG}").push()
                    }
                }
            }
        }
    }
}
