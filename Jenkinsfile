pipeline {
    agent any
    stages {
        stage('Checkout (explicit)') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                // másold fel build-et a szerverre SCP-vel
                sh 'scp -r dist/ user@server:/var/www/html/angular-app/'
            }
        }
    }
    post {
        success {
            echo 'Success'
        }
        failure {
            echo 'failure'
        }
    }
}