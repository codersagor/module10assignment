const app = require('./app');
require('dotenv').config({path: "./config.env"});
const port = process.env.PORT || 8000;


app.listen(port, function () {
    console.log(`Server Running at http://localhost:${port}`)
});