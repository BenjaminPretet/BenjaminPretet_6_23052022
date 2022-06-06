const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [ "String<userId>" ], default: []},
    usersDisliked: { type: [ "String<userId>" ], default: []},
});

module.exports = mongoose.model('sauces', saucesSchema);