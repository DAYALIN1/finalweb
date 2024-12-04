import React, { useState } from "react";
import "../../assets/styles/product-form.scss";
import { updateProduct } from "../../services/admin/productService";

const predefinedCustomOptions = [
    { name: "Color", type: "text", options: [] },
    { name: "Tamaño", type: "text", options: [] },
    { name: "Material", type: "text", options: [] },
    { name: "Imagen", type: "image", options: [] },
];

const UpdateProductModal = ({ onClose, product }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Inicializa el estado del producto con datos preexistentes
    const [productData, setProductData] = useState(() => {
        const initialCustomOptions = predefinedCustomOptions.map((predefinedOption) => {
            const existingOption = product?.customOptions?.find(
                (opt) => opt.name === predefinedOption.name
            );
            return existingOption ? { ...existingOption } : { ...predefinedOption, options: [] }; // Mantén las opciones del producto si existen, de lo contrario, opciones vacías
        });
        return {
            name: product?.name || "",
            description: product?.description || "",
            price: product?.price || "",
            category: product?.category || "General",
            image: null,
            customOptions: initialCustomOptions.filter((option) =>
                product?.customOptions?.some((opt) => opt.name === option.name)
            ),
        };
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

    // Actualiza el valor de una opción personalizada
    const handleEditCustomOptions = (optionIndex, newValue) => {
        setProductData((prev) => {
            const updatedCustomOptions = [...prev.customOptions];
            updatedCustomOptions[optionIndex].options = newValue
                .split(",")
                .map((val) => val.trim());
            return { ...prev, customOptions: updatedCustomOptions };
        });
    };

    // Activa o desactiva una opción personalizada
    const handleToggleCustomOption = (optionName, isChecked) => {
        setProductData((prev) => {
            const updatedCustomOptions = [...prev.customOptions];
            if (isChecked) {
                const predefinedOption = predefinedCustomOptions.find(
                    (opt) => opt.name === optionName
                );
                if (predefinedOption) {
                    updatedCustomOptions.push(predefinedOption);
                }
            } else {
                const indexToRemove = updatedCustomOptions.findIndex(
                    (opt) => opt.name === optionName
                );
                if (indexToRemove > -1) {
                    updatedCustomOptions.splice(indexToRemove, 1);
                }
            }
            return { ...prev, customOptions: updatedCustomOptions };
        });
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
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        Object.keys(productData).forEach((key) => {
            if (key === "customOptions") {
                formDataToSend.append(key, JSON.stringify(productData[key]));
            } else if (key === "image" && productData[key]) {
                formDataToSend.append(key, productData[key]);
            } else {
                formDataToSend.append(key, productData[key]);
            }
        });

        try {
            await updateProduct(product.uuid, formDataToSend);
            alert("Producto actualizado exitosamente.");
            onClose();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert(error.response?.data?.message || "Error al actualizar el producto");
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
                        {predefinedCustomOptions.map((option, index) => (
                            <div key={index} className="option-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={!!productData.customOptions.find(
                                            (opt) => opt.name === option.name
                                        )}
                                        onChange={(e) =>
                                            handleToggleCustomOption(option.name, e.target.checked)
                                        }
                                    />
                                    {option.name}
                                </label>
                                {productData.customOptions.find(
                                    (opt) => opt.name === option.name
                                ) &&
                                    option.type === "text" && (
                                        <textarea
                                            value={
                                                productData.customOptions.find(
                                                    (opt) => opt.name === option.name
                                                )?.options.join(", ") || ""
                                            }
                                            onChange={(e) =>
                                                handleEditCustomOptions(
                                                    productData.customOptions.findIndex(
                                                        (opt) => opt.name === option.name
                                                    ),
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Escribe las opciones separadas por comas"
                                        />
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
                                <li key={index}>{opt.name}: {opt.options.join(", ")}</li>
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
                <h2>Actualizar Producto</h2>
                <div className="tabs">
                    <button onClick={() => setActiveTab(0)}>Información Básica</button>
                    <button onClick={() => setActiveTab(1)}>Opciones Personalizables</button>
                    <button onClick={() => setActiveTab(2)}>Resumen</button>
                </div>
                <div className="tab-content">{renderTabContent()}</div>
                <div className="form-actions">
                    {activeTab > 0 && <button onClick={() => setActiveTab((prev) => prev - 1)}>Anterior</button>}
                    {activeTab < 2 ? (
                        <button onClick={() => setActiveTab((prev) => prev + 1)}>Siguiente</button>
                    ) : (
                        <button onClick={handleSubmit}>Guardar Cambios</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;
