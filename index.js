const express = require('express');

const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers')

// body parser
app.use(express.json());

moviesApi(app);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.get('/', function(req, res) {
  res.send('Hello world');
});

app.get('/json', function(req, res ) {
  res.json({hello:'wordl'});
});

app.listen(config.port, function(){
  console.log(`listening http://localhost:${config.port}`);
});
