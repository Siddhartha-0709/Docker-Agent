# 🐳 Docker Agent

A sleek, professional web interface for remote Docker host management.  
Inspect and control containers, images, volumes, and networks directly from your browser.

> **Fully containerized, lightweight, and secure.**

---

## ✨ Features

- 🔍 **Real-time Container Management** – List all containers with live state updates
- ⚡ **Container Controls** – Start, stop, restart, and remove containers with one click
- 📊 **Live Log Streaming** – Real-time container logs via WebSockets
- 🖼️ **Image Management** – Browse images and spin up containers instantly
- 💾 **Volume Inspector** – View and delete Docker volumes
- 🌐 **Network Configuration** – Inspect networking details across your Docker host
- 📦 **Fully Containerized** – Deploy with Docker Compose in seconds

---

## 📸 Screenshots

<div align="center">

### Dashboard Overview
![Dashboard Overview](https://res.cloudinary.com/djf6ew5uc/image/upload/v1765656256/Github%20Thumbs/Containers_List_moo3od.png)

### Image Management
![Container Logs](https://res.cloudinary.com/djf6ew5uc/image/upload/v1765656256/Github%20Thumbs/Image_List_maga7r.png)

### Volume Inspector
![Images & Volumes](https://res.cloudinary.com/djf6ew5uc/image/upload/v1765656256/Github%20Thumbs/Volume_List_mxwllo.png)

### Network Details
![Network Details](https://res.cloudinary.com/djf6ew5uc/image/upload/v1765656256/Github%20Thumbs/Network_List_nanshx.png)

</div>

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React, ShadCN UI, Tailwind CSS |
| **Backend** | Node.js, Express, Dockerode |
| **Authentication** | Clerk |
| **Containerization** | Docker + Docker Compose |
| **Real-time Streaming** | WebSockets |

---

## 🏗️ Architecture
```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ◄─────► │   Backend   │ ◄─────► │ Docker Host │
│  (React)    │  HTTP   │  (Express)  │  API    │  (Remote)   │
└─────────────┘  + WS   └─────────────┘         └─────────────┘
```

- **Frontend** communicates with the backend REST API
- **Backend** uses Dockerode to query the Docker host via Docker Remote API
- **Logs** are streamed live via WebSockets to the frontend
- **Authentication** is handled securely through Clerk
- The entire system is fully containerized for seamless deployment

---

## 🚀 Installation

### Prerequisites

- Docker & Docker Compose installed
- Docker Remote API access on target host
- Clerk account (for authentication)

---

### Step 1️⃣: Enable Docker Remote API (Port 2375)

> ⚠️ **Security Warning:** Only enable this on **trusted machines**. Exposing port 2375 without TLS is insecure and should only be used in development or behind a firewall.

#### On Linux (systemd):

1. **Create override configuration:**
```bash
   sudo mkdir -p /etc/systemd/system/docker.service.d
   sudo nano /etc/systemd/system/docker.service.d/override.conf
```

2. **Add the following configuration:**
```ini
   [Service]
   ExecStart=
   ExecStart=/usr/bin/dockerd -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375
```

3. **Reload and restart Docker:**
```bash
   sudo systemctl daemon-reexec
   sudo systemctl restart docker
```

4. **Verify the connection:**
```bash
   docker -H tcp://<YOUR_HOST_IP>:2375 info
```
   
   You should see Docker info output from the remote host.

---

### Step 2️⃣: Clone the Repository
```bash
git clone https://github.com/Siddhartha-0709/Docker-Agent.git
cd Docker-Agent
```

---

### Step 3️⃣: Configure Frontend

You have two options to set the Docker host IP:

**Option A: Environment Variable**

Create or edit `.env` in the frontend directory:
```ini
VITE_HOST=YOUR_HOST_IP
```

**Option B: UI Modal**

Use the configuration modal that appears on the frontend to set the host dynamically at runtime.

---

### Step 4️⃣: Launch with Docker Compose
```bash
docker-compose up -d
```

This will:
- Spin up the frontend container (port 5173)
- Spin up the backend container
- Establish connection to your Docker host on port 2375

**Note:** Ensure your Docker host on port 2375 is accessible by the backend container.

---

### Step 5️⃣: Access the Dashboard

Open your browser and navigate to:
```
http://localhost:5173
```

Log in via **Clerk** to access the full dashboard functionality.

---

### Step 6️⃣: Important Security Notes

- 🔒 **Never expose port 2375 publicly** – Always restrict access via firewall rules
- 🔐 **Consider enabling TLS** for secure remote API access (port 2376)
- 🛡️ **Use behind a VPN** or internal network only
- 📡 **WebSocket ports** – Ensure internal ports are open if using firewalls
- 🔑 **Authentication** – Always keep Clerk credentials secure

#### Optional: Enable TLS (Recommended for Production)
```bash
# Generate certificates
openssl genrsa -aes256 -out ca-key.pem 4096
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem

# Configure Docker with TLS
dockerd --tlsverify \
  --tlscacert=ca.pem \
  --tlscert=server-cert.pem \
  --tlskey=server-key.pem \
  -H=0.0.0.0:2376
```

---

## 🔒 Security Considerations

> ⚠️ **Critical:** This project requires Docker Remote API to be enabled on the target host.

### Best Practices

- ✅ **Use behind a VPN** or firewall
- ✅ **Enable TLS** for Docker Remote API (port 2376)
- ✅ **Never expose port 2375 publicly** without proper security
- ✅ **Implement authentication** via Clerk or similar service
- ✅ **Regularly update** dependencies and Docker images
- ✅ **Use network policies** to restrict container communication
- ✅ **Monitor logs** for suspicious activity

### Network Security Configuration
```bash
# Restrict Docker API to specific IP ranges (iptables example)
sudo iptables -A INPUT -p tcp --dport 2375 -s 192.168.1.0/24 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 2375 -j DROP
```

---

## 🗺️ Roadmap

- [ ] Container resource metrics (CPU / Memory / Disk usage)
- [ ] Exec terminal access via browser
- [ ] Multi-host management dashboard
- [ ] Container health monitoring & alerts
- [ ] Docker Compose file management
- [ ] Image build & push capabilities
- [ ] Role-based access control (RBAC)
- [ ] TLS configuration wizard
- [ ] Audit logging

---

## 🐛 Troubleshooting

### Cannot connect to Docker host
```bash
# Check if Docker API is listening
sudo netstat -tlnp | grep 2375

# Test connection
curl http://<YOUR_HOST_IP>:2375/version
```

### Permission denied errors
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### WebSocket connection fails

- Ensure no firewall is blocking WebSocket connections
- Check browser console for specific error messages
- Verify backend container can reach Docker host

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please maintain consistent code style and document new features clearly.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Dockerode](https://github.com/apocas/dockerode)
- UI components from [ShadCN UI](https://ui.shadcn.com/)
- Authentication powered by [Clerk](https://clerk.com/)

---

## 📧 Contact

**Siddhartha** - [GitHub Profile](https://github.com/Siddhartha-0709)

Project Link: [https://github.com/Siddhartha-0709/Docker-Agent](https://github.com/Siddhartha-0709/Docker-Agent)

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ for the Docker community

</div>