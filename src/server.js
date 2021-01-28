const express = require('express');
const app = express();
const port = 3000;

app.all('/action', (req, res) => {
  res.json({
    message: `Hello from action! ${req.input.name}`,
    payload: req.payload
  });
});

app.all('/trigger', (req, res) => {
  res.json({
    message: `Hello from trigger!`,
    payload: req.payload
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
