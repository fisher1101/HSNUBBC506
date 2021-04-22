const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('連線成功')
});

const BattersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    PA: { type: Number, required: true },
    AB: { type: Number, required: true },
    H: { type: Number, required: true },
    RBI: { type: Number, required: true },
    R: { type: Number, required: true },
    SO: { type: Number, required: true },
    BB: { type: Number, required: true },
})

const PitchersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    PA: { type: Number, required: true },
    AB: { type: Number, required: true },
    H: { type: Number, required: true },
    I: { type: Number, required: true },
    R: { type: Number, required: true },
    SO: { type: Number, required: true },
    BB: { type: Number, required: true },
    ER: {type: Number, required: true},
})

const GameSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    vs: { type: String, required: true },
    home: { type: Boolean, required: true },
    guest_score: { type: [Number], required: true },
    home_score: { type: [Number], required: true },
    guest_error: { type: Number, required: true },
    home_error: { type: Number, required: true },
    batters: { type: [BattersSchema], required: true },
    pitchers: { type: [PitchersSchema], required: true },
    photo_url: [String],
})

const Game = mongoose.model('Game', GameSchema)

module.exports = Game