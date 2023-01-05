const express = require("express");
const app = express();
const postBank = require('./postbank');//sj

app.use(express.static('public'));//if anyone request anything from public folder server should return it-called middleware

app.get("/", (req, res, next) => {
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
            <a href="/posts/${post.id}">${post.title}</a>
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

app.get("/posts/:id", (req, res, next) =>{
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
    res.send(html)
  } else {

  res.send(`
  <html>
  <head>
  <link rel='stylesheet' href='/style.css' />
  <title>Wizard News</title>
  </head>
  <body>
  <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <p>
          ${post.content}
          </p>
        </div>
    </div>
  </body>

  </html>`);
  }
})

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
