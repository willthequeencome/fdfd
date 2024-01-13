const Fastify = require("fastify");
const server = Fastify();


server.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

server.register(require("@fastify/http-proxy"), {
	upstream: "https://api.shuttleai.app",
	prefix: "/",
	http2: false,
});

server.listen({ host: "0.0.0.0", port: 8000 }, () => {
	console.log("listening on port 8000");
});
