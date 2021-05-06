const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.use('/user', require('./routes/user'));
app.use('/cook', require('./routes/cook'));
app.use('/patient', require('./routes/patient'));
app.use('/admin', require('./routes/admin'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
