const { Whiteboard } = require('../models/index');

const saveWhiteboardData = async (roomId, whiteboardData) => {
  try {
    const [whiteboard, created] = await Whiteboard.upsert({
      roomId,
      whiteboardData,
    });
    return whiteboard;
  } catch (error) {
    throw new Error('Error saving whiteboard data: ' + error.message);
  }
};

const getWhiteboardData = async (roomId) => {
  try {
    const whiteboard = await Whiteboard.findOne({
      where: { roomId },
    });
    return whiteboard ? whiteboard.whiteboardData : null; 
  } catch (error) {
    throw new Error('Error retrieving whiteboard data: ' + error.message);
  }
};

const clearWhiteboardData = async (roomId) => {
  try {
    const whiteboard = await Whiteboard.update(
      { whiteboardData: [] },
      { where: { roomId } }
    );
    return whiteboard;
  } catch (error) {
    throw new Error('Error clearing whiteboard data: ' + error.message);
  }
};

module.exports = { saveWhiteboardData, getWhiteboardData,clearWhiteboardData};
