const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const collectionRoutes = require('./routes/collections');

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
  
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());


const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/collections")(app);
require("./routes/users")(app);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
