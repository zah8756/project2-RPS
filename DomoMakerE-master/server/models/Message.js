const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  message: {
    type: String,
  },
//     sender: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
