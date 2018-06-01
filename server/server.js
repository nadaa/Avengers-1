
//db connection
require('./config/dbconfig');

//server listening

const app=require('./index')

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on PORT ${PORT}`);
});

