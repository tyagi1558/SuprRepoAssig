// models/Whiteboard.js
module.exports = (sequelize, DataTypes) => {
    const Whiteboard = sequelize.define('whiteboards', {
      roomId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      whiteboardData: {
        type: DataTypes.TEXT,
        allowNull: true, 
      },
    },{
        timestamps: false, 
      });
  
    return Whiteboard;
  };
  