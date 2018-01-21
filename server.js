const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 3001;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendfile('index.html')
})

app.listen(PORT, () => console.log('Learn Bivvy App running on PORT:' + PORT) );
