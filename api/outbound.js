const sql = require('mssql');

module.exports = async (req, res) => {
  const { out_no, in_no, stitm_no, out_qty, out_weight, vendor_code, coil_no, location, user_id } = req.body;

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
    await sql.query`
      INSERT INTO S_PU100_O (OUT_NO, IN_NO, STITM_NO, OUT_QTY, OUT_WEIGHT, STWKC_NO, COIL_NO, MAT_NAME1, CREATE_EMPNO)
      VALUES (${out_no}, ${in_no}, ${stitm_no}, ${out_qty}, ${out_weight}, ${vendor_code}, ${coil_no}, ${location}, ${user_id})
    `;
    res.status(200).json({ message: '출고 등록 완료' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};