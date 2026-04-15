const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Hello from Jenkins + Docker + ECR & automation123456789 🚀",
    time: new Date()
  }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


