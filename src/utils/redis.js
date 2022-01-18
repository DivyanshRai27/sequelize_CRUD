// Redis
const Redis = require("redis");
const client = Redis.createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();
client.set("key", "value");
const value = client.get("key");

module.exports = client;
