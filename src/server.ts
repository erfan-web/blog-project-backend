import app from "./app.js";
import config from "./config/config.js";
import { prisma } from "./config/prisma.js";
const { port } = config;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err: unknown) {
    if (err instanceof Error)
      console.error("Error starting the server:", err.message);
    process.exit(1);
  }
};

main();
