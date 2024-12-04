import React, { useState } from "react";
import "../../assets/styles/product-form.scss";
import { createProduct } from "../../services/admin/productService";

const ProductFormModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "General",
    image: null,
    customOptions: [],
  });

  // Actualiza cualquier campo del formulario
  const updateProductData = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Maneja el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    updateProductData("image", file);
  };

  // Agrega o elimina una opción personalizable
  const handleOptionChange = (option, checked) => {
    setProductData((prev) => {
      const newCustomOptions = checked
        ? [...prev.customOptions, option]
        : prev.customOptions.filter((opt) => opt.name !== option.name);
      return { ...prev, customOptions: newCustomOptions };
    });
  };

  // Actualiza el valor de una opción seleccionada (texto, colores, etc.)
  const updateOptionValue = (optionName, newValue) => {
    setProductData((prev) => ({
      ...prev,
      customOptions: prev.customOptions.map((opt) =>
        opt.name === optionName ? { ...opt, value: newValue } : opt
      ),
    }));
  };

  // Valida el formulario antes de enviarlo
  const validateForm = () => {
    if (!productData.name || !productData.description) {
      alert("El nombre y la descripción son obligatorios.");
      return false;
    }
    return true;
  };

  // Envía los datos al backend
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", productData.name);
    formDataToSend.append("description", productData.description);
    formDataToSend.append("price", productData.price);
    formDataToSend.append("category", productData.category);
  
    if (productData.image) {
      formDataToSend.append("image", productData.image);
    }
  
    formDataToSend.append("customOptions", JSON.stringify(productData.customOptions));
  
    try {
      await createProduct(formDataToSend);
      alert("Producto creado exitosamente.");
      onClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert(error.response?.data?.message || "Error al crear producto");
    }
  };
  

  // Renderiza los tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="grid-container">
            <div className="input-group full-width">
              <label>Nombre del producto</label>
              <input
                type="text"
                value={productData.name}
                onChange={(e) => updateProductData("name", e.target.value)}
                placeholder="Nombre del producto"
                required
              />
            </div>
            <div className="input-group full-width">
              <label>Descripción</label>
              <textarea
                value={productData.description}
                onChange={(e) => updateProductData("description", e.target.value)}
                placeholder="Descripción"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="input-group">
              <label>Precio</label>
              <input
                type="text"
                value={productData.price}
                onChange={(e) => updateProductData("price", e.target.value)}
                placeholder="Precio"
              />
            </div>
            <div className="input-group full-width">
              <label>Categoría</label>
              <select
                value={productData.category}
                onChange={(e) => updateProductData("category", e.target.value)}
              >
                <option value="Tecnologia">Tecnologia</option>
                <option value="Moda">Moda</option>
                <option value="Hogar">Hogar</option>
                <option value="Belleza">Belleza</option>
                <option value="Salud">Salud</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Deportes al Aire Libre">Deportes al Aire Libre</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Entretenimiento">Entretenimiento</option>
              </select>
            </div>
            <div className="input-group full-width">
              <label>Imagen del Producto</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="custom-options-section">
            <h3>Opciones Personalizables</h3>
            {[
              { name: "Tamaño", type: "text", options: [] },
              { name: "Imagen", type: "image", allowedExtensions: [".jpg", ".png"], maxFileSize: 2048 },
              { name: "Color", type: "text", value: [] },
              { name: "Tallas", type: "text", options: [] },
              { name: "Material", type: "text", options: [] },
            ].map((option) => (
              <div key={option.name} className="option-item">
                <label>
                  <input
                    type="checkbox"
                    checked={!!productData.customOptions.find((opt) => opt.name === option.name)}
                    onChange={(e) => handleOptionChange(option, e.target.checked)}
                  />
                  {option.name}
                </label>
                {productData.customOptions.find((opt) => opt.name === option.name) && (
                  <div className="option-values">
                    {option.type === "text" && (
                      <textarea
                        placeholder="Escribe valores separados por comas"
                        onChange={(e) => updateOptionValue(option.name, e.target.value)}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Resumen del Producto</h3>
            <p>Nombre: {productData.name}</p>
            <p>Descripción: {productData.description}</p>
            <p>Precio: {productData.price}</p>
            <p>Categoría: {productData.category}</p>
            <p>Opciones Personalizables:</p>
            <ul>
              {productData.customOptions.map((opt, index) => (
                <li key={index}>
                  {opt.name} - {JSON.stringify(opt)}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="product-form-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Agregar Producto</h2>
        <div className="tabs">
          <button onClick={() => setActiveTab(0)}>Información Básica</button>
          <button onClick={() => setActiveTab(1)}>Opciones Personalizables</button>
          <button onClick={() => setActiveTab(2)}>Resumen</button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
        <div className="form-actions">
          {activeTab > 0 && (
            <button onClick={() => setActiveTab((prev) => prev - 1)}>Anterior</button>
          )}
          {activeTab < 2 ? (
            <button onClick={() => setActiveTab((prev) => prev + 1)}>Siguiente</button>
          ) : (
            <button onClick={handleSubmit}>Guardar Producto</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
