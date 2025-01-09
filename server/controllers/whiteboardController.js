const { saveWhiteboardService, getWhiteboardService } = require('../services/whiteboardService');

const saveWhiteboard = async (req, res) => {
  const { roomId, whiteboardData } = req.body;

  try {
    const response = await saveWhiteboardService(roomId, whiteboardData);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error saving whiteboard data' });
  }
};

const getWhiteboard = async (req, res) => {
  const { roomId } = req.params;

  try {
    const response = await getWhiteboardService(roomId);
    res.json(response); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving whiteboard data' });
  }
};

module.exports = { saveWhiteboard, getWhiteboard };
