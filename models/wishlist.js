const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  sid: {
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
  },
  list_products: {
    type: Array,
  },
  amount: {
    type: Number,
  },
  count: {
    type: Number,
  },
  create_date: {
    type: Date,
  },
  edit_date: {
    type: Date,
  },
});
const Wishlist = mongoose.model("wishlists", wishlistSchema);

module.exports = Wishlist;
