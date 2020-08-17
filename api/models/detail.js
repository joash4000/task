const mongoose = require('mongoose');

const detailSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
   contact: { type: Number, required: true }
});

module.exports = mongoose.model('Details', detailSchema);