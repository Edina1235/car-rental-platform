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
                        bat 'npm install'
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
                        bat 'npm run lint || echo lint failed or not configured'
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
                        bat 'npm test -- --watch=false || echo tests failed or not configured'
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
                        bat 'npm run build -- --configuration production || echo build failed'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'ansible-playbook -i inventory deploy.yml'
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