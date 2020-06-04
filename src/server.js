const express = require('express');
const compression = require('compression')
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/../dist/pidetuchuche-Angular'));
app.use(compression())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist/pidetuchuche-Angular'));
}

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../dist/pidetuchuche-Angular', 'index.html'));
});

app.listen(process.env.PORT || 8080);
