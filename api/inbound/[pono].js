const sql = require('mssql');

module.exports = async (req, res) => {
  const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    options: { encrypt: false }
  };

  try {
    await sql.connect(dbConfig);
    const result = await sql.query`SELECT * FROM S_PU100_I WHERE PU_PONO = ${req.query.pono}`;
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};