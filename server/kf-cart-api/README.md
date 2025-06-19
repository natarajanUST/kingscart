# E-commerce Backend (Express.js)

A starter project for building a scalable e-commerce backend with:

✅ **Express.js**  
✅ **PostgreSQL** (users, orders)  
✅ **MongoDB** (product catalog)  
✅ **Redis** (cart/session)  
✅ **Elasticsearch** (search)

## 🚀 How to run

1. **Install dependencies**

```bash
npm install

2. **Create .env**

env
# .env
PORT=3000
POSTGRES_URL=postgres://user:pass@localhost:5432/ecommerce
MONGO_URL=mongodb://localhost:27017/ecommerce
REDIS_URL=redis://localhost:6379
ELASTIC_URL=http://localhost:9200
Start local dev

npm run dev

Endpoints

POST /api/users/register — Register user

POST /api/users/login — Login user

POST /api/products — Create product

GET /api/products — List products

POST /api/cart/save — Save cart

GET /api/cart/:userId — Get cart
```
