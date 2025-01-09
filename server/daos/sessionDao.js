const { Room } = require('../models'); 

const checkRoomExists = (roomId) => {
    console.log("Dao---", roomId)

  return Room.findOne({ where: { roomId } });
};

const createRoomInDb = (roomId, roomName) => {
  return Room.create({ roomId, roomName });
};

const getRoomFromDb = (roomId) => {
  return Room.findOne({ where: { roomId } });
};

module.exports = { checkRoomExists, createRoomInDb, getRoomFromDb };
