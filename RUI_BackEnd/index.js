const mongoose = require("mongoose");
const { app } = require("./app.js");
const { config } = require("./config");
mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server running: PORT ${PORT}`);
});
