const express = require('express');
const { apiRouter } = require('./routers');

const app = express();
const PORT = 8080;

// api routes
app.use('/', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
