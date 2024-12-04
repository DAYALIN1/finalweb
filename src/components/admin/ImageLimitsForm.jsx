import React from 'react';
import '../../assets/styles/image-limits-form.scss';

const ImageLimitsForm = () => {
  return (
    <div className="image-limits-form">
      <h2>Definir límites de tamaño</h2>
      <form>
        <div className="form-group">
          <label>Tamaño mínimo de la imagen</label>
          <input type="text" placeholder="label" />
        </div>
        <div className="form-group">
          <label>Tamaño máximo de la imagen</label>
          <input type="text" placeholder="label" />
        </div>
        <button>Definir</button>
      </form>
    </div>
  );
};

export default ImageLimitsForm;
