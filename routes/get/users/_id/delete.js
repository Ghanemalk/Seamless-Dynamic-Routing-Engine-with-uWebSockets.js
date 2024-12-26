module.exports = (req, res) => {
  const { params } = req;
  res.writeHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'GET route works!' }));
};