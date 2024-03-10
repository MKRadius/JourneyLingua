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
                dir("frontend") {
                    sh "npm install"
                }
                dir("backend") {
                    sh "npm install"
                }
            }
        }
    }
}