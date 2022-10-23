const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');

app.engine('hbs',expressHbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir:__dirname + '/views/partials',
    extname : 'hbs',
    defaultLayout : 'layouts',
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

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

app.get('/',(req,res) => {
    res.render('index')
})
app.get('/blog', (req,res) => {
    res.render('blog');
});
app.get('/cart', (req,res) => {
    res.render('cart');
});
app.get('/category', (req,res) => {
    res.render('category');
});
app.get('/checkout', (req,res) => {
    res.render('checkout');
});
app.get('/confirmation', (req,res) => {
    res.render('confirmation');
});
app.get('/contact', (req,res) => {
    res.render('contact');
});
app.get('/register', (req,res) => {
    res.render('register');
});
app.get('/login', (req,res) => {
    res.render('login');
});
app.get('/single-blog', (req,res) => {
    res.render('single-blog');
});
app.get('/single-product', (req,res) => {
    res.render('single-product');
});
app.get('/tracking-order', (req,res) => {
    res.render('tracking-order');
});

app.get('/sync',(req,res) => {
    let models = require('./models');
    models.sequelize.sync()
    .then(()=>{
        res.send('database sync completed!')
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=> {
    console.log(`Server is running on port ${app.get('port')}`);
})