import React, { useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ onClear, onLogout, onShare, onSave, onColorChange, onThicknessChange }) => {
  const [color, setColor] = useState('#000000'); // Default color black
  const [thickness, setThickness] = useState(2); // Default thickness 2px

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor); // Prop to notify parent component
  };

  const handleThicknessChange = (e) => {
    const newThickness = e.target.value;
    setThickness(newThickness);
    onThicknessChange(newThickness); // Prop to notify parent component
  };

  return (
    <div className="toolbar">
      <button onClick={onClear}>Clear</button>
      
      {/* Pencil color picker */}
      <div>
        <label htmlFor="colorPicker">Color: </label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={handleColorChange}
        />
      </div>
      
      {/* Pencil thickness selector */}
      <div>
        <label htmlFor="thicknessSelect">Thickness: </label>
        <select
          id="thicknessSelect"
          value={thickness}
          onChange={handleThicknessChange}
        >
          <option value={2}>Thin</option>
          <option value={5}>Medium</option>
          <option value={10}>Thick</option>
        </select>
      </div>

      {/* Optionally, you can add Logout, Share, Save buttons */}
      {/* <button onClick={onLogout}>Logout</button> */}
      {/* <button onClick={onShare}>Share</button> */}
      {/* <button onClick={onSave}>Save</button> */}
    </div>
  );
};

export default Toolbar;
