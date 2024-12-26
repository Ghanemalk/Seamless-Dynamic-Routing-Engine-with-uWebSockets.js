module.exports = ({ params, query }, res) => {
  res.writeHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'GET route works!' }));
};
