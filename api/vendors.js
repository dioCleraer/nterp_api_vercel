import sql from 'mssql';

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  options: { encrypt: false }
};

export default async function handler(req, res) {
  try {
    await sql.connect(dbConfig);
    const keyword = req.query.search || '';
    const result = await sql.query`
      SELECT TOP 10 VENDOR_NO, VENDOR_NAME 
      FROM S_ST005 
      WHERE VENDOR_NAME LIKE '%' + ${keyword} + '%'
    `;
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}