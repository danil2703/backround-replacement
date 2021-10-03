module.exports = async (req, res) => {
  res.statusCode = 404;
  res.json({ message: 'Not found' });
};
