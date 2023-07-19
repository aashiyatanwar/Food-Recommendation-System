const mongoose = require("mongoose");
const Data = mongoose.Schema(
  {
    SrNo: { type: Number, required: true },
    RecipeName: {
      type: String,
      required: true,
    },
    Ingredients: { type: String, required: true },
    TotalTimeInMins: {
      type: Number,
      required: true,
    },
    Cuisine: { type: String, required: true },
    Instructions: {
      type: String,
      required: true,
    },
    URL: {
      type: String,
      required: true,
    },
    CleanedIngredients: { type: String, required: true },
    imageurl: { type: String, required: true },
    Ingredientcount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("data", Data);

