module.exports = (req, res) => {
  res.writeHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'GET route works!' }));
};