const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send('Hello sir')
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=> {
    console.log(`Server is running on port ${app.get('port')}`);
})