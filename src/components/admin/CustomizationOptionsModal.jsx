import React, { useState } from 'react';
import '../../assets/styles/customization-options.scss';
import TextOptionsForm from './TextOptionsForm'; // Conservamos TextOptionsForm
import ColorOptionsForm from './ColorOptionsForm'; // Conservamos ColorOptionsForm

const CustomizationOptionsModal = ({ onClose, onOptionsSelected }) => {
  const customizationOptions = [
    {
      category: 'Ropa',
      options: [
        { id: 1, title: 'Tipo de tela', description: '¿Qué tipo de tela hay para este producto?', selected: false },
        { id: 2, title: 'Tallas', description: '¿Qué tallas hay para este producto?', selected: false },
      ],
    },
    {
      category: 'Accesorios',
      options: [
        { id: 3, title: 'Tamaños', description: '¿Qué tamaños hay para este producto?', selected: false },
        { id: 4, title: 'Materiales', description: '¿Qué materiales usa este producto?', selected: false },
      ],
    },
    {
      category: 'General',
      options: [
        { id: 5, title: 'Colores', description: '¿Qué colores hay para este producto?', selected: false },
        { id: 6, title: 'Texto', description: '¿Qué texto quieres que agreguen?', selected: false },
        { id: 7, title: 'Imágenes', description: 'Imágenes sin límites.', selected: false },
      ],
    },
  ];

  const [options, setOptions] = useState(customizationOptions);
  const [activeForm, setActiveForm] = useState(null); // Controla los formularios activos

  const handleCheckboxChange = (categoryIndex, optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions[categoryIndex].options[optionIndex].selected =
      !updatedOptions[categoryIndex].options[optionIndex].selected;
    setOptions(updatedOptions);
  };

  const handleOpenForm = (optionId) => {
    if ([1, 2, 3, 4].includes(optionId)) {
      setActiveForm(optionId); // Abre TextOptionsForm para las primeras 4 opciones
    } else if (optionId === 5) {
      setActiveForm(optionId); // Abre ColorOptionsForm para colores
    } else {
      setActiveForm(null); // Imágenes y textos simples se manejan directamente
    }
  };

  const handleBackToOptions = () => {
    setActiveForm(null); // Vuelve a la lista de opciones
  };

  const handleSaveOptions = () => {
    const selectedOptions = options
      .flatMap((category) => category.options)
      .filter((option) => option.selected);

    onOptionsSelected(selectedOptions); // Pasa las opciones seleccionadas al formulario principal
    onClose(); // Cierra el modal
  };

  const renderActiveForm = () => {
    if ([1, 2, 3, 4].includes(activeForm)) {
      return <TextOptionsForm onClose={handleBackToOptions} />;
    }
    if (activeForm === 5) {
      return <ColorOptionsForm onClose={handleBackToOptions} />;
    }
    return null; // Para imágenes y textos generales, no hay formularios adicionales
  };

  return (
    <div className="customization-modal">
      <div className="modal-content">
        {!activeForm ? (
          <>
            <h2>Pedir opciones de personalización</h2>

            {options.map((category, categoryIndex) => (
              <div className="category" key={category.category}>
                <h3>{category.category}</h3>
                {category.options.map((option, optionIndex) => (
                  <div className="option" key={option.id}>
                    <div className="option-details">
                      <input
                        type="checkbox"
                        checked={option.selected}
                        onChange={() => handleCheckboxChange(categoryIndex, optionIndex)}
                      />
                      <div>
                        <p className="title">{option.title}</p>
                        <p className="description">{option.description}</p>
                      </div>
                    </div>
                    {([1, 2, 3, 4, 5].includes(option.id)) && (
                      <div className="option-actions">
                        <button
                          className="view-button"
                          onClick={() => handleOpenForm(option.id)}
                          disabled={!option.selected}
                        >
                          Ver Opciones
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            <div className="modal-actions">
              <button onClick={handleSaveOptions} className="save-button">
                Guardar Opciones
              </button>
              <button onClick={onClose} className="cancel-button">
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <div className="form-tab">
            <button className="back-button" onClick={handleBackToOptions}>
              &larr; Volver a Opciones
            </button>
            {renderActiveForm()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizationOptionsModal;
