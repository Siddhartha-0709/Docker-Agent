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

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose installed
- Docker Remote API enabled on target host
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Siddhartha-0709/Docker-Agent.git
   cd Docker-Agent
```

2. **Configure environment variables**
   
   Set your Docker host IP in the frontend `.env` or via the UI modal.

3. **Launch with Docker Compose**
```bash
   docker-compose up -d
```

4. **Access the application**
   
   Open your browser and navigate to:
```
   http://localhost:5173
```

5. **Authenticate**
   
   Log in via Clerk to start managing your Docker hosts.

---

## 🔒 Security Considerations

> ⚠️ **Important:** This project requires Docker Remote API to be enabled on the target host.

### Best Practices

- ✅ **Use behind a VPN** or firewall
- ✅ **Enable TLS** for Docker Remote API
- ✅ **Never expose port 2375 publicly** without proper security
- ✅ **Implement authentication** via Clerk or similar service
- ✅ **Regularly update** dependencies and Docker images

### Recommended Setup
```bash
# Enable Docker Remote API with TLS
dockerd --tlsverify --tlscacert=ca.pem --tlscert=server-cert.pem --tlskey=server-key.pem -H=0.0.0.0:2376
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