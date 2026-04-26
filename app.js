const http = require("http");

const PORT = 3000;
const VERSION = "v3"; // 👈 CHANGE THIS EVERY TIME

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>DevOps Dashboard</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: black;
      color: lime;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .box {
      border: 3px solid lime;
      padding: 30px;
      text-align: center;
      width: 400px;
    }

    h1 {
      color: yellow;
      font-size: 30px;
    }

    .version {
      font-size: 22px;
      margin: 15px 0;
      color: cyan;
    }

    button {
      padding: 10px 15px;
      background: lime;
      border: none;
      cursor: pointer;
      font-weight: bold;
    }

    .output {
      margin-top: 20px;
      color: white;
    }
  </style>
</head>

<body>

  <div class="box">
    <h1>⚡ NEW UI LOADED</h1>

    <div class="version">VERSION: ${VERSION}</div>

    <button onclick="getData()">CHECK API</button>

    <div class="output" id="output"></div>
  </div>

  <script>
    function getData() {
      fetch('/api')
        .then(res => res.json())
        .then(data => {
          document.getElementById("output").innerHTML =
            "Message: " + data.message + "<br>" +
            "Time: " + new Date(data.time).toLocaleString();
        });
    }
  </script>

</body>
</html>
`;

const server = http.createServer((req, res) => {

  // ❗ DISABLE CACHE COMPLETELY
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json; charset=UTF-8" });
    res.end(JSON.stringify({
      message: "🔥 YOU ARE SEEING LATEST VERSION",
      time: new Date(),
      version: "${VERSION}"
    }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log("Running version:", VERSION);
});



