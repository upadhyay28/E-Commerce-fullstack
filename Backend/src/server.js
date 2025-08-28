const express = require("express");
const mongoose = require("mongoose");
const route = require("./Route/route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); //middleware
app.use("/", route); // middleware

mongoose
  .connect(
    "mongodb+srv://khushijoshi2813:dvuZFBZgzCYZkPYb@cluster0.o6j2te7.mongodb.net/E-commmerce"
  )

  .then(() => console.log("database connected"))
  .catch(() => console.log("database is not connected"));

app.get("/", (req, res) => {
  res.send("Hello express");
});

const PORT = 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running at Port 4000");
  }
});
