const TabContent = ({ title, text, values, imgSrc, isActive }) => {
    return (
      <div className={`tab-content ${isActive ? "active" : ""}`}>
        <div className="content">
          {text && (
            <div className="text-box">
              <p>{text}</p>
            </div>
          )}
          {values && (
            <div className="values-container">
              {values.map((value, index) => (
                <div key={index} className="text-box">
                  <p>{value}</p>
                </div>
              ))}
            </div>
          )}
  
          {/* Mostrar las imágenes si imgSrc es un array */}
          {imgSrc && (
            <div className="image-box">
              {Array.isArray(imgSrc) ? (
                // Si imgSrc es un array, mostrar todas las imágenes
                imgSrc.map((src, index) => (
                  <div
                    key={index}
                    className={`image ${index % 2 === 0 ? "left" : "right"}`}
                  >
                    <img src={src} alt={`${title} ${index + 1}`} />
                  </div>
                ))
              ) : (
                // Si imgSrc no es un array, mostrar solo una imagen
                <img src={imgSrc} alt={title} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default TabContent;