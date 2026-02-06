# 🚀 DevOps Task Manager

A full-stack 3-tier web application (React, Node.js, MongoDB) fully containerized with Docker.

## 🏗 Architecture

* **Frontend:** React (Vite) - Served via Nginx
* **Backend:** Node.js (Express)
* **Database:** MongoDB

## 🛠 Prerequisites

* Docker
* Docker Compose

## 🚀 Getting Started

You don't need Node.js or MongoDB installed on your machine to run this!

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/MartinS984/task-manager.git](https://github.com/MartinS984/task-manager.git)
    cd task-manager
    ```

2.  **Run with Docker Compose**
    ```bash
    docker-compose up -d --build
    ```

3.  **Access the App**
    * Frontend: [http://localhost](http://localhost)
    * Backend API: [http://localhost:5000](http://localhost:5000)

## 📂 Project Structure

* `/frontend`: React application (Multi-stage Dockerfile)
* `/backend`: Node.js API (Standard Dockerfile)
* `docker-compose.yml`: Orchestration for local development

## 🛑 Stopping the App

To stop and remove the containers:
```bash
docker-compose down

## ☸️ Kubernetes (Minikube)

We use the "Local Path" strategy (building images directly inside Minikube) to avoid pushing to a remote registry.

### 1. Start Minikube
```bash
minikube start
2. Point Docker to Minikube
Critical Step: This command points your terminal's Docker CLI to Minikube's internal engine.

Bash
eval $(minikube -p minikube docker-env)
3. Build Images Locally
Because we switched engines, we must rebuild the images so they exist inside the cluster.

Bash
docker build -t task-backend:latest ./backend
docker build -t task-frontend:latest ./frontend
4. Deploy
Apply all configuration files in the k8s folder:

Bash
kubectl apply -f k8s/
5. Access the App
To open the frontend service in your browser:

Bash
minikube service frontend