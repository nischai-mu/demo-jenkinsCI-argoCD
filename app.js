const http = require("http");

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>My DevOps App v1</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(10px);
      padding: 40px;
      border-radius: 20px;
      width: 420px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    h1 {
      margin-bottom: 10px;
    }

    .status {
      display: inline-block;
      padding: 5px 12px;
      background: #00c853;
      border-radius: 20px;
      font-size: 12px;
      margin-top: 10px;
    }

    .time {
      margin-top: 20px;
      font-size: 14px;
      color: #ffe082;
    }

    .tag {
      margin-top: 20px;
      font-size: 13px;
      opacity: 0.8;
    }
  </style>
</head>
<body>

  <div class="card">
    <h1>🚀 DevOps Dashboard</h1>
    <div class="status">SYSTEM ONLINE</div>

    <p class="tag">CI/CD Pipeline: Jenkins → Docker → ECR → K8s</p>

    <div class="time">
      Live Time: <span id="time"></span>
    </div>
  </div>

  <script>
    function updateTime() {
      document.getElementById("time").innerText = new Date().toLocaleString();
    }
    setInterval(updateTime, 1000);
    updateTime();
  </script>

</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log("v1 running on port", PORT);
});
