import React from 'react';
import '../../assets/styles/text-limits-form.scss';

const TextLimitsForm = () => {
  return (
    <div className="text-limits-form">
      <h2>Definir límites de caracteres</h2>
      <form>
        <div className="form-group">
          <label>Tamaño máximo de los caracteres</label>
          <input type="text" placeholder="label" />
        </div>
        <button>Definir</button>
      </form>
    </div>
  );
};

export default TextLimitsForm;
