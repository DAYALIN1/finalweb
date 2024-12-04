import React, { useState } from 'react';
import '../../assets/styles/color-options-form.scss';

const ColorOptionsForm = () => {
  const [color, setColor] = useState('#ffffff');
  const options = ['#E41818', '#1877E4']; // Colores de ejemplo

  return (
    <div className="color-options-form">
      <h2>Gestionar Opciones</h2>
      <div className="color-picker">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          value={color}
          readOnly
          style={{ textTransform: 'uppercase' }}
        />
        <button>Agregar opción</button>
      </div>
      <div className="options-grid">
        {options.map((option, index) => (
          <div key={index} className="option-card">
            <div className="color-preview" style={{ backgroundColor: option }} />
            <span>{`Código ${option}`}</span>
            <div className="actions">
              <button className="delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorOptionsForm;
