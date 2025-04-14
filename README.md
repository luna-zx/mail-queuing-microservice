# 📬 Microservice Email Queue with Docker, RabbitMQ & Nodemailer

[![Docker](https://img.shields.io/badge/Docker-blue.svg)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-red.svg)](https://www.rabbitmq.com/docs)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg)](https://www.typescriptlang.org/)

---

## ⚙️ Tech Stack

- **Docker** – Orchestrates services
- **Express.js** – API
- **RabbitMQ** – Queue system
- **Nodemailer** – Email sending
- **TypeScript** – Type-safety

---

## 🚀 Features

- ✅ Email queue with RabbitMQ
- 📬 Email sending with Nodemailer
- 🔧 Microservice architecture
- 🐳 Easily deployable with Docker Compose

---

## 🧩 Service Structure

- `rabbitmq` - Message broker used as queue backbone
- `api-service` - Accepts email requests and publishes to queue
- `email-service` - Consumes jobs from queue and sends emails

## 📦 Installation

```bash
git clone https://github.com/luna-zx/mail-queuing-microservice.git
```

## 🧪 Setting Up 

`docker-compose.yml` :

```yml
rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: your_uname # your RabbitMQ user
      RABBITMQ_DEFAULT_PASS: your_pass # your RabbitMQ pass
```

`api-service/.env` : 

```env
API_PORT = # your api port

RABBITMQ_URL = amqp://your_uname:your_pass@rabbitmq
```

`email-service/.env` : 

```env
SMTP_HOST = # your SMTP HOST 
SMTP_PORT = # your SMTP PORT
SMTP_USER = # your SMTP USER
SMTP_PASS = # your SMTP PASSWORD

RABBITMQ_URL = amqp://your_uname:your_pass@rabbitmq
```

## ▶️ Deploy

Docker Compose :
```bash
docker compose up --build
```

## 📨 Send a Test Email

```bash
curl -X POST http://localhost:your_api_port/send-email \
-H "Content-Type: application/json" \
-d '{ "to": "test@gmail.com", "subject": "Hello from sigma boy", "html": "<p>Test</p>" }'
```

Or : 

```javascript
axios.post("http://localhost:your_api_port/send-email", {
    to: "test@gmail.com",
    subject: "Hello from sigma boy",
    html: "<p>Test</p>"
})
```