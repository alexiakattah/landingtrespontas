const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ua = require('express-useragent');
const mailgun = require("mailgun-js");
var API_KEY = 'bc8841e92d4d123434dd9d0eb9015830-156db0f1-c26f70a6';
  var DOMAIN = 'tropzz.com.br';
  
  const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});
const PORT = process.env.PORT || 3000;

const homeRoutes = require('./routes/home.route');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(ua.express());
app.use(helmet({ contentSecurityPolicy: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));

app.use(homeRoutes);
app.post('/send', (req, res, next)=>{
 const {html}= req.body
 
  const data = {
    from: "LP Três Pontas <noreply@tropzz.com.br>",
    // to: "Tropzz Tres Pontas <noreply@tropzz.com.br>",
    to: "marca@tropzz.com.br",
    subject: "Cadastro de cupom Tropzz tres pontas",
    html,
  };

  mg.messages().send(data, function (error, body) {
 
    console.log(body);
    console.log(error)
  })
} )

server.listen(PORT, () => console.log(`[SERVER] => ${PORT}`));
