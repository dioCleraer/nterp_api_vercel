// api/outbound.js
import sql from 'mssql';

const dbConfig = { /* same as above */ };

export default async function handler(req, res) {
  const { out_no, in_no, stitm_no, out_qty, out_weight, vendor_code, coil_no, location, user_id } = req.body;
  try {
    await sql.connect(dbConfig);
    await sql.query`
      INSERT INTO S_PU100_O 
      (OUT_NO, IN_NO, STITM_NO, OUT_QTY, OUT_WEIGHT, STWKC_NO, COIL_NO, MAT_NAME1, CREATE_EMPNO)
      VALUES 
      (${out_no}, ${in_no}, ${stitm_no}, ${out_qty}, ${out_weight}, ${vendor_code}, ${coil_no}, ${location}, ${user_id})
    `;
    res.status(200).json({ message: '출고 등록 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}