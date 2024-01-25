const Fastify = require("fastify");
const server = Fastify();

server.register(require('@fastify/cors'), {
  // Enable CORS for all origins except localhost
  origin: (origin, cb) => {
    if (/^localhost$/m.test(origin)) {
      // Do not include CORS headers for requests from localhost
      cb(null, false);
    } else {
      // Enable CORS for other origins
      cb(null, true);
    }
  }
});

server.register(require("@fastify/http-proxy"), {
  upstream: "https://talkai.info",
  prefix: "/",
  http2: false,
});

server.listen({ host: "0.0.0.0", port: 8000 }, () => {
  console.log("listening on port 8000");
});
