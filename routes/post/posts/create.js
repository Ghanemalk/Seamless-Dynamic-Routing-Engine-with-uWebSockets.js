module.exports = (req, res) => {
  const { body } = req;
  res.writeHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'POST route works!' }));
};