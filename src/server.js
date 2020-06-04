const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/pidetuchuche-angular'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/pidetuchuche-angular'}
);
});

app.listen(process.env.PORT || 8080);
