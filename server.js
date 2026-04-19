import express from "express";
import redisClient from "./config/redis.js";

const app = express();

app.get("/test", (_req, res) => {
  res.json({ message: "Blink is running" });
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const key = `user:${id}`;

  const cachedData = await redisClient.get(key);

  if (cachedData) {
    console.log("Cache HIT");
    return res.json(JSON.parse(cachedData));
  }

  console.log("Cache MISS");

  await new Promise((res) => setTimeout(res, 2000));

  const user = {
    id,
    name: "Kajol Singh",
    source: "DB",
  };

  await redisClient.setEx(key, 60, JSON.stringify(user));

  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  console.log("Updating DB...");

  await redisClient.del(`user:${id}`);

  res.json({
    message: "User updated and cache cleared"
  });
});

app.listen(4000, () => {
  console.log("Server started");
});
