import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../generated/prisma/client.js";

/*
 const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
  connectTimeout: 60000,
  socketTimeout: 60000,
});
*/
// /*
const adapter = new PrismaMariaDb({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: parseInt(process.env.MYSQLPORT || "3306", 10),
  connectTimeout: 60000,
  socketTimeout: 60000,
  connectionLimit: 10,
}); 
// */
const prisma = new PrismaClient({ adapter });

export { prisma };
