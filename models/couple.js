const mongoose = require("mongoose");
const coupleSchema = new mongoose.Schema({
  sid: {
    type: String,
  },
  user_1: {
    type: Object
  },
  user_2: {
    type: Object
  },
  sort_id: {
    type: mongoose.Types.ObjectId,
  },
  host: {
    type: String
  },
  wishlist_id_1: {
    type: mongoose.Types.ObjectId,
  },
  wishlist_id_2: {
    type: mongoose.Types.ObjectId,
  },
});
const Couple = mongoose.model("couples", coupleSchema);

const UserFriend = {
  code: "",
  friend: "",
  name: ""
}

module.exports = Couple;
