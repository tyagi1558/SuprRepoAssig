const sessionService = require('../services/sessionService');
const whiteboardService = require('../services/whiteboardService'); 

// Create a room
const createRoom = async (req, res) => {
  console.log(" req.body", req.body)
  const { roomId, roomName } = req.body;
console.log("roomId, roomName",roomId, roomName)
  try {
    const response = await sessionService.createRoomService({ roomId, roomName });

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const roomResponse = await sessionService.getRoomService(roomId);
    
    const whiteboardData = await whiteboardService.getWhiteboardService(roomId);
    
    res.json({
      ...roomResponse,
      whiteboardData: whiteboardData, 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { createRoom, getRoom };
