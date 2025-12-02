// import { createClient } from "redis";

// const client = createClient({
//   username: "default",
//   password: "oWSwNB99XxsXWqJquC8ym4ezsZRNkTyc",
//   socket: {
//     host: "redis-17218.c57.us-east-1-4.ec2.redns.redis-cloud.com",
//     port: 17218,
//   },
// });

// const connectRedis = async () => {
//   await client.connect();
//   console.log("Redis connected successfully!");
// };

// client.on("error", (error) => {
//   console.error("Redis Client Error:", error);
// });

// export { client, connectRedis };

// Redis disabled for local setup

const client = {
  connect: async () => {},
  on: () => {},
  get: async () => null,
  set: async () => {},
};

const connectRedis = async () => {
  console.log("Redis skipped (running without Redis).");
};

export { client, connectRedis };
