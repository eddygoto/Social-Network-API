const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return `${this.reactions.length}`;
}).set(function() {
  const reactionCount = this.reactions.length;
  this.set(reactionCount);
});

function dateFormat(time) {
  return `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
