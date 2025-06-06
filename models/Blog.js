const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'public', // private
    enum: ['public', 'private'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = model('Blog', blogSchema);
