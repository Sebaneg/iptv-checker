const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/verificar", async (req, res) => {
  const { url, user, pass } = req.query;

  if (!url || !user || !pass) {
    return res.status(400).json({ status: "error", message: "Faltan parámetros" });
  }

  const testUrl = `${url.replace(/\/$/, "")}/get.php?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}&type=m3u_plus&output=mpegts`;

  try {
    const response = await axios.get(testUrl, { timeout: 8000 });
    if (response.data.includes("#EXTM3U")) {
      res.json({ status: "activo" });
    } else {
      res.json({ status: "inactivo" });
    }
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor API IPTV corriendo en puerto 3000");
});
