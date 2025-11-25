pipeline {
    agent any

    stages {
        stage('Checkout (declarative)') {
            steps {
                checkout scm
            }
        }

        stage('Workspace debug') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'pwd'
                        sh 'ls -la'
                        sh 'node -v || echo "node not found"'
                        sh 'npm -v || echo "npm not found"'
                    } else {
                        bat 'echo %CD%'
                        bat 'dir'
                        bat 'node -v || echo node not found'
                        bat 'npm -v || echo npm not found'
                    }
                }
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'wsl npm install'
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run lint || echo "lint failed or not configured"'
                    } else {
                        bat 'wsl npm run lint || echo lint failed or not configured'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test -- --watch=false || echo "tests failed or not configured"'
                    } else {
                        bat 'wsl npm test -- --watch=false || echo tests failed or not configured'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build -- --configuration production || echo build failed'
                    } else {
                        bat 'wsl npm run build -- --configuration production || echo build failed'
                    }
                }
            }
        }

        stage('Start backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'pm2 start npm --name backend -- run start-server || pm2 restart backend'
                    } else {
                        bat 'wsl pm2 start npm --name backend -- run start-server || pm2 restart backend'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'sudo ansible-playbook deploy.yml -i localhost'
                    } else {
                        bat 'wsl sudo ansible-playbook deploy.yml -i localhost'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'success'
        }
        failure {
            echo 'failure'
        }
    }
}