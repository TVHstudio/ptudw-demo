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

app.get('/',(req,res) => {
    res.render('index')
})

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=> {
    console.log(`Server is running on port ${app.get('port')}`);
})