const sequelize = require('../config/connection');
const { User, Spotify } = require('../models');

const seedAll = async () => {
    await sequelize.sync({ force: true });

// Add seeds once created

};
    seedAll();
