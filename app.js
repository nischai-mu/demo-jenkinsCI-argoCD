const http = require("http");

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>My DevOps App v2</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #141e30, #243b55);
      color: white;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(12px);
      padding: 40px;
      border-radius: 20px;
      width: 450px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    }

    h1 {
      margin-bottom: 10px;
    }

    button {
      margin-top: 20px;
      padding: 12px 18px;
      border: none;
      border-radius: 10px;
      background: #00e676;
      color: black;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background: #69f0ae;
    }

    .output {
      margin-top: 20px;
      font-size: 14px;
      color: #ffd54f;
    }

    .badge {
      background: #ff1744;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
    }
  </style>
</head>
<body>

  <div class="card">
    <h1>🚀 DevOps Dashboard</h1>

    <div class="badge">VERSION 2</div>

    <p>CI/CD Pipeline: Jenkins → Docker → ECR → Kubernetes</p>

    <button onclick="getUpdate()">🔥 Get Deployment Update</button>

    <div class="output" id="output"></div>
  </div>

  <script>
    function getUpdate() {
      fetch('/api')
        .then(res => res.json())
        .then(data => {
          document.getElementById("output").innerHTML =
            "✔ Message: " + data.message + "<br>" +
            "⏱ Time: " + data.time + "<br>" +
            "🚀 Version: " + data.version;
        });
    }
  </script>

</body>
</html>
`;

const server = http.createServer((req, res) => {

  if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "🔥 NEW FEATURE DEPLOYED VIA CI/CD PIPELINE",
      time: new Date(),
      version: "v2"
    }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log("v2 running on port", PORT);
});

