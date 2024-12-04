import React, { useState, useEffect } from "react";
import "../../assets/styles/manage-products.scss";
import UpdateProductModal from "../../components/admin/UpdateProductModal"; // Modal para edición
import ProductFormModal from "../../components/admin/ProductFormModal"; // Modal para agregar
import ConfirmationModal from "../../components/shared/ConfirmationModal"; // Modal para confirmación
import { getProducts, deleteProduct } from "../../services/admin/productService"; // Servicio de productos

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Estado para el modal de agregar productos
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar productos desde la API al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products || data || []); // Ajusta según la estructura
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenUpdateModal = (product) => {
    console.log("Producto seleccionado para actualizar:", product); // Debug
    setSelectedProduct(product); // Selecciona el producto para editar
    setIsUpdateModalOpen(true); // Abre el modal de edición
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProduct(null); // Limpia el producto seleccionado
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true); // Abre el modal de agregar producto
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); // Cierra el modal de agregar producto
  };

  const handleOpenConfirmationModal = (product) => {
    setSelectedProduct(product); // Selecciona el producto para confirmar eliminación
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedProduct(null); // Limpia el producto seleccionado
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct?.uuid) {
      console.error("No se puede eliminar: Producto no seleccionado o UUID no válido");
      return;
    }

    try {
      // Llama al servicio para eliminar el producto
      await deleteProduct(selectedProduct.uuid);

      // Filtra el producto eliminado de la lista
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.uuid !== selectedProduct.uuid)
      );

      console.log(`Producto eliminado: ${selectedProduct.name}`);
      setIsConfirmationModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-products">
      <div className="header">
        <h1>Administrar Artículos</h1>
        <div className="buttons">
          <button onClick={handleOpenAddModal}>Agregar Artículo</button>
        </div>
      </div>
      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No hay productos para mostrar.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.uuid} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.imagePath || "https://via.placeholder.com/100"}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="product-details">
                <p>Nombre artículo: {product.name || "N/A"}</p>
                <p className="bold">Precio: ${product.price || "0.00"}</p>
                <p>Departamento: {product.category || "Sin categoría"}</p>
              </div>
              <div className="product-actions">
                <button
                  className="view-button"
                  onClick={() => handleOpenUpdateModal(product)}
                >
                  Ver Detalle
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleOpenConfirmationModal(product)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de actualización */}
      {isUpdateModalOpen && (
        <UpdateProductModal
          onClose={handleCloseUpdateModal}
          product={selectedProduct} // Pasa el producto seleccionado al modal
        />
      )}

      {/* Modal de agregar producto */}
      {isAddModalOpen && (
        <ProductFormModal
          onClose={handleCloseAddModal} // Cierra el modal de agregar
        />
      )}

      {/* Modal de confirmación */}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          onClose={handleCloseConfirmationModal}
          onConfirm={handleDeleteProduct}
          message={`¿Estás seguro de que deseas eliminar el producto "${selectedProduct?.name}"?`}
        />
      )}
    </div>
  );
};

export default ManageProducts;
