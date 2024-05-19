const User = require(`./User`);
const Spotify = require(`./Spotify`);


User.hasOne(Spotify, {
    foreignKey: `user_id`,
});

module.exports = { User, Spotify };