const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname : 'hbs',
    defaultLayout : 'layouts',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir:__dirname + '/views/partials'
});
app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req,res) => {
    res.render('index');
});
 app.get('/:page', (req,res) => {
     let banners = {
         blog : 'Our blog',
         category : 'Shop Category',
         cart : 'Shopping Cart',
         checkout : 'Checkout',
         confirmation : 'Confirmation',
         contact : 'Contact',
         register : 'Register',
         login : 'login',
     };
     let page = req.params.page;
     res.render(page, {banner: banners[page]});
 });

app.get('/blog', (req,res) => {
  res.render('blog');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=> {
    console.log(`Server is running on port ${app.get('port')}`);
})