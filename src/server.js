const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.all('/action', (req, res) => {
  res.json({
    greeting: `Greetings, ${req.body.input.name}! Have a nice day`,
  });
});

app.all('/trigger', (req, res) => {
  res.json({
    message: `Hello from trigger!`,
    payload: req.body
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
