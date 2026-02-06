# 1. Start with a lightweight Node.js operating system
FROM node:18-alpine

# 2. Create a folder inside the container to hold our app
WORKDIR /app

# 3. Copy only the package list first (for better caching!)
COPY package*.json ./

# 4. Install dependencies inside the container
RUN npm install

# 5. Copy the rest of our code
COPY . .

# 6. Tell Docker we plan to use port 5000
EXPOSE 5000

# 7. The command to run when the container starts
CMD ["node", "server.js"]