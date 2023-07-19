const express = require("express");
const app = express();
require("dotenv/config");


const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  return res.json("Hi there");
});

//user authentatication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });

const sampleRoute = require("./routes/data");
app.use("/api/sample/", sampleRoute);

app.use(express.json())
const postRoute = require("./routes/post");
app.use("/api/post/" , postRoute)

const commentRoute = require("./routes/comment");
app.use("/api/comment/" , commentRoute)



app.listen(5000, () => console.log("express server listening to 5000"));
