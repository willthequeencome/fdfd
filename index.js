const Fastify = require("fastify");
const server = Fastify();

server.register(require("@fastify/http-proxy"), {
	upstream: "https://worker-holy-star-fec9.alappan077.workers.dev",
	prefix: "/",
	http2: false,
});

server.listen({ host: "0.0.0.0", port: 8000 }, () => {
	console.log("listening on port 8000");
});
