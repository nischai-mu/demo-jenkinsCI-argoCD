const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DevOps Dashboard</title>

  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }

    .card {
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(15px);
      border-radius: 20px;
      padding: 40px;
      width: 420px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      animation: fadeIn 0.8s ease;
    }

    h1 {
      margin-bottom: 10px;
      font-size: 28px;
    }

    .version {
      color: #00e5ff;
      font-size: 18px;
      margin-bottom: 15px;
    }

    .status {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
      margin-bottom: 20px;
      background: #00e676;
      color: black;
      font-weight: bold;
    }

    .time {
      color: #ffd54f;
      margin-bottom: 20px;
      font-weight: bold;
    }

    button {
      padding: 12px 18px;
      border: none;
      border-radius: 10px;
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

    .pipeline {
      margin-top: 20px;
      font-size: 14px;
      opacity: 0.9;
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

    <div class="version">Version: ${VERSION}</div>

    <div class="status">SYSTEM ONLINE</div>

    <div class="time" id="time"></div>

    <div class="pipeline">
      CI/CD: GitHub Actions → Docker → ECR → Kubernetes
    </div>

    <button onclick="getData()">🔥 Check Deployment</button>

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

    function getData() {
      fetch('/api')
        .then(res => res.json())
        .then(data => {
          document.getElementById("output").innerHTML =
            "✔ Message: " + data.message + "<br>" +
            "⏱ Time: " + new Date(data.time).toLocaleString() + "<br>" +
            "🚀 Version: " + data.version;
        })
        .catch(() => {
          document.getElementById("output").innerHTML =
            "❌ Failed to fetch deployment data";
        });
    }
  </script>

</body>
</html>
`;
