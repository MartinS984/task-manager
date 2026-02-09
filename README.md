# 🚀 DevOps Task Manager

A full-stack **Three-Tier Application** (React, Node.js, MongoDB) fully containerized with Docker and orchestrated with Kubernetes.

This project demonstrates a complete DevOps workflow, featuring a React frontend, Node.js backend, and a **persistent** MongoDB database.

## 🏗 Architecture

* **Frontend:** React (Vite) - Served via Nginx
* **Backend:** Node.js (Express) - REST API
* **Database:** MongoDB - StatefulSet with Persistent Volume
* **Orchestration:** Kubernetes (Minikube) with Ingress Controller

---

## 🛠 Option 1: Docker Compose (Local Dev)

Quickly spin up the environment locally without Kubernetes.

1.  **Run with Docker Compose**
    ```bash
    docker-compose up -d --build
    ```

2.  **Access the App**
    * Frontend: [http://localhost](http://localhost)
    * Backend API: [http://localhost:5000](http://localhost:5000)

3.  **Stop the App**
    ```bash
    docker-compose down
    ```

---

## ☸️ Option 2: Kubernetes (Production-Ready)

This deployment uses the **Minikube Docker Driver** strategy (building images directly inside the cluster) and an **Nginx Ingress Controller** for path-based routing (`/` for UI, `/tasks` for API).

### 1. Start Minikube & Enable Ingress
```bash
minikube start
minikube addons enable ingress
```

### 2. Point Docker to Minikube
Critical Step: This command points your terminal's Docker CLI to Minikube's internal engine so we don't need a registry.

```bash
eval $(minikube -p minikube docker-env)
```
### 3. Build Images Inside the Cluster
Because we switched engines, we must rebuild the images so they exist inside Minikube.

```bash
docker build -t task-backend:latest ./backend
docker build -t task-frontend:latest ./frontend
```
### 4. Deploy to Kubernetes
Apply all configuration files (Deployments, Services, PVC, Ingress):

```bash
kubectl apply -f k8s/
# Or if files are in root: kubectl apply -f .
```
### 5. Access the App (via Ingress)
Since we are using the Docker driver, we need a tunnel to the Ingress Controller:

```bash
minikube service ingress-nginx-controller -n ingress-nginx --url
```
Click the first URL (HTTP) from the output to open the full application!

🧪 Verification & Persistence Test
Add a Task: Open the app and create a task (e.g., "Persistence Test").

Kill the Database: Simulate a crash by deleting the MongoDB pod.

```bash
kubectl delete pod -l app=mongo
```
Verify: Wait for the pod to auto-restart, then refresh the page. The task will still be there!

📂 Project Structure
/frontend: React application (Multi-stage Dockerfile)

/backend: Node.js API (Standard Dockerfile)

/k8s: Kubernetes Manifests (Deployment, Service, PVC, Ingress)

docker-compose.yml: Local development orchestration

🧹 Cleanup
```bash
minikube stop
minikube delete
```