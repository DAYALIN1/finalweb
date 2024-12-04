import '../../assets/styles/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section left">
          <h4>Contáctanos</h4>
          <p>Si tienes alguna pregunta, por favor contáctanos a nuestro correo:</p>
          <a href="mailto:soporte@eshop.com" className="email">soporte@eshop.com</a>
          <p className="phone">
            <span role="img" aria-label="phone">📞</span> (503) 1234 5678
          </p>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Añadir una sugerencia</a></li>
          </ul>
        </div>

        <div className="footer-section center">
          <h4>Horarios de Atención</h4>
          <p>Lunes a Viernes: <strong>8am - 4pm</strong></p>
          <p>Sábados: <strong>9am - 5pm</strong></p>
          <img 
            src="../../assets/logo.png" 
            alt="eShop Logo" 
            className="logo-image" 
          />
        </div>

        <div className="footer-section right">
          <h4>Categorías</h4>
          <div>
            <h5>Ropa</h5>
            <ul>
              <li>• Camisetas</li>
              <li>• Hoodies</li>
            </ul>
          </div>
          <div>
            <h5>Colección</h5>
            <ul>
              <li>• Tazas</li>
              <li>• Banners</li>
            </ul>
          </div>
          <a href="#" className="view-all">Ver todas las categorías</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-text">
          <p>
            Copyright © <a href="https://www.yourshopurl.com" className="brand">eShop</a> 2024. All Rights Reserved.
          </p>
        </div>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f77" width="24" height="24">
              <path d="M22 2.25H2a.75.75 0 0 0-.75.75v18a.75.75 0 0 0 .75.75h12V14.5h-3v-3h3V8.5c0-3.3 2-5 4.9-5 1.4 0 2.1.1 2.1.1v3h-1.5c-1.5 0-2 1-2 2v2.5h3.5l-.5 3h-3v7.25h5a.75.75 0 0 0 .75-.75v-18a.75.75 0 0 0-.75-.75z" />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f77" width="24" height="24">
              <path d="M12 2.2C6.5 2.2 2 6.7 2 12.2c0 5 3.6 9.1 8.4 9.9v-7h-2.5v-2.9h2.5V9.3c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6v2h2.8l-.4 2.9h-2.4v7c4.8-.8 8.4-4.9 8.4-9.9-.1-5.5-4.6-10-10.1-10z" />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f77" width="24" height="24">
              <path d="M12 2.2C6.5 2.2 2 6.7 2 12.2c0 5 3.6 9.1 8.4 9.9v-7h-2.5v-2.9h2.5V9.3c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6v2h2.8l-.4 2.9h-2.4v7c4.8-.8 8.4-4.9 8.4-9.9-.1-5.5-4.6-10-10.1-10z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;