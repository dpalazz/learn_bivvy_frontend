const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.listen(PORT, () => console.log('Learn Bivvy App Running on Port...', PORT));
