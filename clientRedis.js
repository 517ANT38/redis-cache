const redis = require("redis");
const HOST = process.env.REDIS_SERVER || "localhost";
const PORT = process.env.PORT_REDIS || "6379";
const client = redis.createClient({url:`redis://${HOST}:${PORT}`});    
module.exports=client;