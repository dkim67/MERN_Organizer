import express from "express";
import path from "path";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import bb from "express-busboy";

//import routes
import todoRoutes from "./routes/todo.server.route";

const app = express();

bb.extend(app);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/mern-todo-app",
  {
    useMongoClient: true
  }
);
app.use("/api", todoRoutes);
app.get("/", (req, res) => {
  return res.end("Api working");
});
// catch 404
app.use((req, res, next) => {
  res.status(404).send("<h2 align=center>Page Not Found!</h2>");
});
// start the server
app.listen(port, () => {
  console.log(`App Server Listening at ${port}`);
});
