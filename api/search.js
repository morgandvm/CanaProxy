export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const q = req.query.q;
  if (!q) { res.status(400).json({ error: 'Missing query' }); return; }

  try {
    const upstream = await fetch(
      `https://api.lorcast.com/v0/cards/search?q=${encodeURIComponent(q)}`,
      { headers: { 'Accept': 'application/json' } }
    );
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Upstream error', detail: e.message });
  }
}
