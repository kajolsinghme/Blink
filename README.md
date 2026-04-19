# 🚀 Blink – Instant Data Delivery

Blink is a lightweight backend service that improves API performance using Redis caching. It reduces response time by storing frequently accessed data in memory and serving it instantly.

---

## ⚡ Features

- Redis-based caching (TTL supported)
- Cache HIT / MISS logic
- Automatic cache expiration
- Cache invalidation on data update

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Redis (Docker)

---

## 🐳 Run Redis (Docker)

```bash
docker run -d -p 6379:6379 --name blink-redis redis
