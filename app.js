const express = require("express");
const app = express();
const postBank = require('./postbank');//sj

app.use(express.static('public'));//if anyone request anything from public folder server should return it-called middleware

app.get("/", (req, res) => {
  //TODO get all the posts
  const posts = postBank.list();

  res.send(`
  <html>
  <head>
  <link rel='stylesheet' href='/style.css' />
  <title>Wizard News</title>
  </head>
  <body>
  <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>

  </html>
  `)
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
