const sessionDao = require('../daos/sessionDao'); 

const createRoomService = async (roomData) => {
  const { roomId, roomName } = roomData;

  try {
    const existingRoom = await sessionDao.checkRoomExists(roomId);

    if (existingRoom) {
      throw new Error('Room already exists');
    }

    await sessionDao.createRoomInDb(roomId, roomName);

    return { msg: 'Room created successfully', roomId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRoomService = async (roomId) => {
  try {
    const room = await sessionDao.getRoomFromDb(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    return {
      roomId: room.roomId,
      roomName: room.roomName,
      message: 'Room found',
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createRoomService, getRoomService };
