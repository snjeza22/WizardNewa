const express = require("express");
const app = express();
const postBank = require('./postbank');//sj

app.use(express.static('public'));//if anyone request anything from public folder server should return it-called middleware

app.get("/", (req, res) => {
  //TODO get all the posts
  res.send(`
  <html>
  <head>
  <link >
  <title>Wizard News</title>
  </head>
  <body>
  <h1>Wizards News</h1>
  </body>
  
  </html>
  `)
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
