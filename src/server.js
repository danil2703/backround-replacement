const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { apiRouter } = require('./routers');

const app = express();
const PORT = 8080;

// api routes
app.use('/', apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
