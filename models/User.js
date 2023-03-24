const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please fill a valid email address',
      ],
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function() {
  return `${this.friends.length}`;
}).set(function() {
  const friendCount = this.friends.length;
  this.set(friendCount);
});

const User = model('user', userSchema)

module.exports = User;
