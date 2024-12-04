import React, { useState } from 'react';
import '../../assets/styles/text-options-form.scss';

const TextOptionsForm = ({ onClose }) => {
  const [textOptions, setTextOptions] = useState([
    { id: 1, label: 'Opción XL' },
    { id: 2, label: 'Opción L' },
    { id: 3, label: 'Opción M' },
    { id: 4, label: 'Opción S' },
    { id: 5, label: 'Opción XS' },
  ]);

  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setTextOptions([...textOptions, { id: textOptions.length + 1, label: newOption }]);
      setNewOption(''); // Limpia el input
    }
  };

  return (
    <div className="text-options-form">
      <h2>Gestionar Opciones</h2>
      <div className="options-header">
        <div className="new-option-input">
          <input
            type="text"
            placeholder="Agregar nueva opción"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
        </div>
        <button onClick={handleAddOption}>Agregar opción</button>
      </div>
      <div className="options-list">
        {textOptions.map((option) => (
          <div key={option.id} className="option-card">
            <div className="option-title">{option.label}</div>
            <div className="actions">
              <button className="delete-button">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextOptionsForm;
