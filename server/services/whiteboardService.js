const { saveWhiteboardData, getWhiteboardData, clearWhiteboardData } = require('../daos/whiteboardDao');

const saveWhiteboardService = async (roomId, whiteboardData) => {
  try {
    await saveWhiteboardData(roomId, whiteboardData); 
    return { msg: 'Whiteboard data saved successfully' };
  } catch (error) {
    console.log(error.stack)
    throw new Error('Error saving whiteboard data');
  }
};
const getWhiteboardService = async (roomId) => {
  try {
    const whiteboardData = await getWhiteboardData(roomId);

    if (!whiteboardData) {
      return []; 
    }

    const parsedData = JSON.parse(whiteboardData); 

    return parsedData;
  } catch (error) {
    console.log("Error retrieving whiteboard data:", error.message);
    throw new Error(error.message);
  }
};
const clearWhiteboardService = async (roomId) => {
  try {
    await clearWhiteboardData(roomId);
    return { msg: 'Whiteboard data cleared successfully' };
  } catch (error) {
    console.log("Error clearing whiteboard data:", error.message);
    throw new Error('Error clearing whiteboard data');
  }
};

module.exports = { saveWhiteboardService, getWhiteboardService,clearWhiteboardService };

