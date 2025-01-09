import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Whiteboard.css';
import Toolbar from './Toolbar';  // Import Toolbar component

const Whiteboard = ({ roomId }) => {
  const canvasRef = useRef(null);
  const initialCanvasSize = useRef({ width: 0, height: 0 });
  const [drawingData, setDrawingData] = useState([]);  // This holds the drawing data
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [drawingThickness, setDrawingThickness] = useState(2);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const socket = useRef(null);
  const prevPoint = useRef({ x: null, y: null });
  const isDrawing = useRef(false);  // To track drawing state

  // Clear canvas function
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Draw line on canvas
  const drawLineOnCanvas = (x1, y1, x2, y2, color, thickness) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  // Erase line on canvas
  const eraseLineOnCanvas = (x1, y1, x2, y2) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1));
  };

  // Handle window resize and update canvas size
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 80; // Adjust height based on toolbar size
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (initialCanvasSize.current.width === 0 && initialCanvasSize.current.height === 0) {
        initialCanvasSize.current.width = canvas.width;
        initialCanvasSize.current.height = canvas.height;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    socket.current = io('http://localhost:5000', { transports: ['websocket'] });
    socket.current.emit('joinRoom', roomId);

    socket.current.on('whiteboardData', (data) => {
      replayWhiteboardData(data);
    });

    socket.current.on('draw', (data) => {
      const { x1, y1, x2, y2, color, thickness } = data;
      drawLineOnCanvas(x1, y1, x2, y2, color, thickness);
    });

    socket.current.on('clear', () => {
      clearCanvas();
    });

    socket.current.on('erase', (data) => {
      const { x1, y1, x2, y2 } = data;
      eraseLineOnCanvas(x1, y1, x2, y2);
    });

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 80;

    // Start drawing function
    const startDrawing = (e) => {
      isDrawing.current = true;
      const x = e.clientX || e.touches[0].clientX;
      const y = e.clientY || e.touches[0].clientY;
      prevPoint.current.x = x;
      prevPoint.current.y = y;
      canvas.style.cursor = 'url("https://cdn-icons-png.flaticon.com/512/2/2262.png"), auto'; // Custom pencil cursor
    };

    // Stop drawing function
    const stopDrawing = () => {
      isDrawing.current = false;
      canvas.style.cursor = 'default'; 
    };

    // Draw function
    const draw = (e) => {
      if (!isDrawing.current) return;
    
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
      if (prevPoint.current.x !== null && prevPoint.current.y !== null) {
        if (isEraserActive) {
          eraseLineOnCanvas(prevPoint.current.x, prevPoint.current.y, x, y);
          socket.current.emit('erase', { roomId, x1: prevPoint.current.x, y1: prevPoint.current.y, x2: x, y2: y });
        } else {
          socket.current.emit('draw', { 
            roomId, 
            x1: prevPoint.current.x, 
            y1: prevPoint.current.y, 
            x2: x, 
            y2: y, 
            color: drawingColor, 
            thickness: drawingThickness 
          });
    
          setDrawingData(prevData => [
            ...prevData, 
            { x1: prevPoint.current.x, y1: prevPoint.current.y, x2: x, y2: y, color: drawingColor, thickness: drawingThickness }
          ]);
    
          drawLineOnCanvas(prevPoint.current.x, prevPoint.current.y, x, y, drawingColor, drawingThickness);
        }
      }
    
      prevPoint.current.x = x;
      prevPoint.current.y = y;
    };
    
   
  const replayWhiteboardData = (data) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext('2d');
  
  // Clear the canvas completely before redrawing
  context.clearRect(0, 0, canvas.width, canvas.height);  

  // Ensure data is in array format
  if (!Array.isArray(data)) {
    try {
      data = JSON.parse(data); 
    } catch (error) {
      console.error("Invalid data format:", error);
      return;
    }
  }

  // Scaling based on canvas size and initial canvas size
  const scaleX = canvas.width / initialCanvasSize.current.width;
  const scaleY = canvas.height / initialCanvasSize.current.height;

  // Set line properties for smoothness
  context.lineCap = 'round'; 
  context.lineJoin = 'round'; 
  context.setLineDash([]);  // Solid lines

  // Loop through each drawing data and render
  data.forEach((drawData) => {
    if (drawData && drawData.x1 !== undefined && drawData.y1 !== undefined && drawData.x2 !== undefined && drawData.y2 !== undefined && drawData.color) {
      context.strokeStyle = drawData.color;
      context.lineWidth = drawData.thickness || 2; 

      // Apply scaling to the coordinates
      const scaledX1 = drawData.x1 * scaleX;
      const scaledY1 = drawData.y1 * scaleY;
      const scaledX2 = drawData.x2 * scaleX;
      const scaledY2 = drawData.y2 * scaleY;

      // Draw the current line segment
      context.beginPath();
      context.moveTo(scaledX1, scaledY1); 
      context.lineTo(scaledX2, scaledY2); 
      context.stroke();
    }
  });
};

    
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startDrawing);  
    canvas.addEventListener('touchend', stopDrawing);    
    canvas.addEventListener('touchmove', draw);          

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchend', stopDrawing);
      canvas.removeEventListener('touchmove', draw);
    };
  }, [roomId, drawingColor, drawingThickness, isEraserActive]);

  const handleColorChange = (color) => {
    setDrawingColor(color);
  };

  const handleThicknessChange = (thickness) => {
    setDrawingThickness(thickness);
  };

  const handleEraserToggle = (isActive) => {
    setIsEraserActive(isActive);
  };

  const handleClear = () => {
    socket.current.emit('clear', { roomId });
  };

  return (
    <div className="canvas-container">
      <Toolbar 
        onClear={handleClear} 
        onColorChange={handleColorChange} 
        onThicknessChange={handleThicknessChange} 
        onEraserToggle={handleEraserToggle}  
      />
      <canvas ref={canvasRef} className="whiteboard" />
    </div>
  );
};

export default Whiteboard;

