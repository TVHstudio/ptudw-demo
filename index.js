let express = require('express');

let app = express();
app.use(express.static(__dirname + '/public'));

let expressHbs = require('express-handlebars');

let helper = require('./controllers/helper');

let hbs = expressHbs.create({
    extname : 'hbs',
    defaultLayout : 'layouts',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir:__dirname + '/views/partials',
    runtimeOptions : {allowProtoPropertiesByDefault : true},
    helpers: {
        createStarList : helper.createStarList,
        createStars : helper.createStars
    }   
});
app.engine('hbs',hbs.engine);

app.set('view engine', 'hbs');  

app.use('/',require('./routes/indexRouter'));
app.use('/products',require('./routes/productRouter'));

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