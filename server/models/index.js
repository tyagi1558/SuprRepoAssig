const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();  // Ensure your environment variables are loaded

// Initialize Sequelize with the connection string and dialect
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'mysql',  // Explicitly set the dialect
  logging: false,    // Disable logging (optional)
});

// Import and initialize the Room model
const Room = require('./sessionModel')(sequelize, DataTypes);
const Whiteboard = require('./Whiteboard')(sequelize, DataTypes);

// Export the sequelize instance and the Room model
module.exports = { Room,Whiteboard, sequelize };
