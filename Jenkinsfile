pipeline {
    agent any
    
    stages {
        stage("Checkout") {
            steps {
                git branch: 'Khai', credentialsId: 'GitHub', url: 'https://github.com/MKRadius/JourneyLingua.git'
            }
        }

        stage("Build") {
            steps {
                script {
                    if (isUnix()) {
                        dir('frontend') {
                            sh 'npm install'
                        }
                        dir('backend') {
                            sh 'npm install'
                        }
                    } else {
                        dir('frontend') {
                            bat 'npm install'
                        }
                        dir('backend') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }
    }
}
