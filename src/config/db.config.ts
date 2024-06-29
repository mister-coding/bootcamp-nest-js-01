import { registerAs } from "@nestjs/config";

export default registerAs('db',()=>({
    host: process.env.DB_HOST || "localhost",
    port: 1234
}))