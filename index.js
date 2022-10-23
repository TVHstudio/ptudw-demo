const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('/',(req,res) =>{
    res.send('Hello from my website')
} );
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=> {
    console.log(`Server is running on port ${app.get('port')}`);
})