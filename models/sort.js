const mongoose = require("mongoose");
const sortSchema = new mongoose.Schema({
  sid: {
    type: String,
  },
  name_group: {
    type: String,
  },
  host: {
    type: mongoose.Types.ObjectId,
  },
  list_names: Array,
  event_date: Date,
  price: Number,
  create_date: Date,
  edit_date: Date,
});
const Sort = mongoose.model("sorts", sortSchema);

module.exports = Sort;
