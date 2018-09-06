const cities = require("all-the-cities");
const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");

const cors = corsMiddleware({
  origins: ["*"]
});

function getCity(req, res, next) {
  const city = cities[Math.floor(Math.random() * cities.length)];
  res.send(city);
  next();
}

const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.get("/city", getCity);

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});
