const { Schema, model } = require('mongoose');

const { schema } = require('./secure/postValidation');

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'عمومی', // private
    enum: ['عمومی', 'خصوصی'],
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

blogSchema.statics.postValidation = function (body) {
  return schema.validate(body, {abortEarly: false});
}


module.exports = model('Blog', blogSchema);
