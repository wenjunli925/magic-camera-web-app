const express = require("express");
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({limit: '2MB'}));

const database = new Datastore('database.db');
database.loadDatabase();
database.insert({name: 'Wenjun', status: 'success'});

app.post('/api', (request, response) => {
  const data = request.body;
  database.insert(data);
  console.log(data);
  response.json({
    status: 'success',
    image: request.body.image64,
  });
}); 

