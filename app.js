const http = require("http");

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DevOps Dashboard</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }

    .card {
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(15px);
      padding: 40px;
      border-radius: 20px;
      width: 420px;
      text-align: center;
      box-shadow: 0 15px 50px rgba(0,0,0,0.3);
      animation: fadeIn 0.8s ease-in-out;
    }

    h1 {
      margin-bottom: 15px;
      font-size: 28px;
    }

    .status {
      display: inline-block;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .online {
      background: #00e676;
      color: #003300;
    }

    .offline {
      background: #ff1744;
      color: white;
    }

    p {
      font-size: 15px;
      opacity: 0.9;
    }

    .time {
      margin-top: 10px;
      color: #ffd54f;
      font-weight: bold;
    }

    button {
      margin-top: 25px;
      padding: 12px 20px;
      border: none;
      border-radius: 12px;
      background: #00e676;
      color: black;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      transform: scale(1.05);
      background: #69f0ae;
    }

    .output {
      margin-top: 20px;
      font-size: 14px;
      color: #fff176;
      line-height: 1.6;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>

<body>

  <div class="card">
    <h1>🚀 DevOps Dashboard</h1>

    <div id="statusBadge" class="status online">SYSTEM ONLINE</div>

    <p>CI/CD Pipeline: Jenkins → Docker → ECR → Kubernetes</p>

    <div class="time" id="time"></div>

    <button onclick="getUpdate()">🔥 Get Deployment Update</button>

    <div class="output" id="output"></div>
  </div>

  <script>
    function updateTime() {
      const now = new Date();
      document.getElementById("time").innerText =
        "Live Time: " + now.toLocaleString();
    }

    setInterval(updateTime, 1000);
    updateTime();

    function getUpdate() {
      fetch('/api')
        .then(res => res.json())
        .then(data => {
          document.getElementById("output").innerHTML =
            "✔ Message: " + data.message + "<br>" +
            "⏱ Time: " + new Date(data.time).toLocaleString() + "<br>" +
            "🚀 Version: " + data.version;

          // simulate status toggle (optional)
          const badge = document.getElementById("statusBadge");
          badge.classList.remove("offline");
          badge.classList.add("online");
          badge.innerText = "SYSTEM ONLINE";
        })
        .catch(() => {
          const badge = document.getElementById("statusBadge");
          badge.classList.remove("online");
          badge.classList.add("offline");
          badge.innerText = "SYSTEM OFFLINE";
        });
    }
  </script>

</body>
</html>
`;

const server = http.createServer((req, res) => {

  if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json; charset=UTF-8" });
    res.end(JSON.stringify({
      message: "🔥 NEW FEATURE DEPLOYED VIA CI/CD PIPELINE",
      time: new Date(),
      version: "v2"
    }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log("🚀 DevOps Dashboard running on port", PORT);
});
