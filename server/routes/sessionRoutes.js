const express = require('express');
const router = express.Router();
const { createRoom, getRoom } = require('../controllers/sessionController');
const { saveWhiteboard, getWhiteboard } = require('../controllers/whiteboardController');

router.post('/create', createRoom);

router.get('/room/:roomId', getRoom);

router.post('/whiteboard', saveWhiteboard);

router.get('/whiteboard/:roomId', getWhiteboard);


module.exports = router;
