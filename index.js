const express = require('express');
const mongoose = require('mongoose');
const app = express();
const postRoutes = require('./routes/index');
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use('/', postRoutes);
app.get('/', (req, res, next) => {
  res.send('<img src="https://thegreenmanstore.com/wp-content/uploads/2016/06/13427763_10153503941555826_7175295780673970923_n.jpg"/>');
});
//mongoDB connection string
const url = "mongodb+srv://SonWendy:dung7101995@sonwendy-xwouj.mongodb.net/test?retryWrites=true&w=majority";
//const url = "mongodb+srv://onebot:Input%21%409969@onebotcms-zj2sz.mongodb.net/test?retryWrites=true&w=majority"
//serving the application the port 3000
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000);
    console.log('database connected!');
  })
  .catch(err => console.log(err));