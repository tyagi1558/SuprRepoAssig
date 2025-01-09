module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "rooms",
    {
      roomId: {
        type: DataTypes.STRING,
        primaryKey: true, 
        allowNull: false,
        unique: true, 
      },
      roomName: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Room;
};
