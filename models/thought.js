const { Schema, model } = require('mongoose');
const Thought = require('./thought');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You need to provide a thought!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'You need to provide a username!'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

module.exports = ThoughtSchema;

