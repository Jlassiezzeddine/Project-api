const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
  roomName: { type: String, required: true },
  roomCapacity: { type: Number, required: true },
  TheaterId: { type: Schema.Types.ObjectId, ref: "Theater" },
});

const Room = model("Room", roomSchema);
module.exports = Room;
