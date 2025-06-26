const { DataSource } = require("typeorm");
const path = require("path");
const { OrderManagement } = require("../../dist/entities/order.entity");
const { CustomerCancellation } = require("../../dist/entities/customerCancellation.entity");
const { CancelReason } = require("../../dist/entities/cancelReason.entity");


const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ecommerce',
  synchronize: true, // Set to false in production
  logging:  ["query", "error"] ,
  entities: [OrderManagement, CustomerCancellation, CancelReason],
});

module.exports = { AppDataSource };