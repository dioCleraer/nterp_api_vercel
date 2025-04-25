module.exports = (req, res) => {
  res.status(200).json([
    { VENDOR_NO: "TEST01", VENDOR_NAME: "테스트업체1" },
    { VENDOR_NO: "TEST02", VENDOR_NAME: "테스트업체2" }
  ]);
};v
