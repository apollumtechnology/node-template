import Fastify from "fastify";
import cors from "@fastify/cors";

import { usersRoutes } from "./application/routes";

const app = Fastify();
app.register(cors);
app.register(usersRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
