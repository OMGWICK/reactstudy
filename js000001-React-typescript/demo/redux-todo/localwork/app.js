const express = require('express');
const app = express();
const port = 5050;

app.get('/list', (req, res) => {
  res.send(['早上', '中午', '晚上']);
});
app.listen(port, () => console.log(`Example app listening on port port!`));
