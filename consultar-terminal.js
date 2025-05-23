export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responder OPTIONS para preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo se permite POST" });
  }

  const body = {
    token: "xx2qj35cr77INwSqtxjQyDdU+w/ubEF/",
    sn: "2440011005000052",
    refreshInfos: "true",
  };

  try {
    const response = await fetch(
      "http://tms.bvs-tms.com/openApi/api/terminal/queryTerminalBySn",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al llamar a la API externa" });
  }
}
