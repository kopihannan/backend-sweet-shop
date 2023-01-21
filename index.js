const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const register = require("./authentication/register");
const login = require("./authentication/login");

app.get("/", (res, req) => {
  req.send(`${port} Sweet Store server is running`);
});

app.listen(port, () => {
  console.log(`Server now is runnig ${port}`);
});

app.use("/register", register);
app.use("/login", login);

const URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.risshmy.mongodb.net/?retryWrites=true&w=majority`;

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: [{ type: String }],
});

const SweetStore = mongoose.model("sweetproducts", productSchema);

try {
  mongoose.connect(URI);
  console.log("mongoose connected");
} catch (error) {
  console.log(error);
}

app.post("/products", async (req, res) => {
  try {
    const newProduct = new SweetStore({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    });
    const productData = await newProduct.save();
    res.send(productData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const product = await SweetStore.find();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await SweetStore.findOne({ _id: id });
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});
