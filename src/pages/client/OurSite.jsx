import React, { useState } from 'react';
import TabContent from '../../components/client/TabContent'; // Ajustar la ruta al componente TabContent
import '../../assets/styles/OurSite.scss'; // Crear un archivo SCSS específico si no existe

// Importar las imágenes desde assets
import mercadoDeValorImg from '../../assets/images/envases.webp';
import valores from '../../assets/images/personalizacion.png';
import opti from '../../assets/images/optimizacion.jpg';
import comu from '../../assets/images/comunicacion.png';

const OurSite = () => {
    const [activeTab, setActiveTab] = useState("vision");

    const tabs = [
        {
            id: "vision",
            title: "Nuestra Visión",
            text: `
                Visión de la Empresa: 
                "Ser la empresa líder en el mercado de personalización de productos, ofreciendo a nuestros clientes una experiencia única y satisfactoria al permitirles crear artículos que reflejen su individualidad y estilo. Aspiramos a innovar continuamente en tecnología y diseño, manteniéndonos a la vanguardia de las tendencias de personalización y sostenibilidad, con un compromiso hacia la calidad, la creatividad, y el respeto al medio ambiente. Queremos que nuestros productos no solo sean un reflejo de la identidad de cada cliente, sino también una inspiración para que cada persona exprese su creatividad y personalidad de manera accesible y amigable. Nos esforzamos en establecer relaciones duraderas con nuestros clientes, colaboradores y comunidad, para construir juntos un futuro donde la personalización esté al alcance de todos."
            `,
            imgSrc: [mercadoDeValorImg, valores],
        },
        {
            id: "valores",
            title: "Nuestros Valores Fundamentales",
            values: [
                `
                    1. Creatividad y Originalidad:
                    Inspiramos a nuestros clientes a expresar su individualidad con productos únicos y auténticos.

                    2. Calidad y Excelencia:
                    Ofrecemos productos de alta calidad, cuidando cada detalle para superar las expectativas.

                    3. Innovación Constante:
                    Nos mantenemos actualizados en tecnología y tendencias para mejorar la personalización y sostenibilidad.
                `,
                `
                    4. Satisfacción del Cliente:
                    Priorizamos una experiencia de compra excepcional y un servicio de atención efectivo.

                    5. Sostenibilidad y Responsabilidad Ambiental:
                    Promovemos prácticas que minimicen el impacto ambiental y favorezcan un consumo responsable.

                    6. Compromiso y Transparencia:
                    Actuamos con honestidad y ética, construyendo relaciones de confianza con nuestros clientes.

                    7. Trabajo en Equipo y Colaboración:
                    Fomentamos un ambiente colaborativo donde el talento de cada miembro contribuye al éxito de la empresa.
                `,
            ],
            imgSrc: null,
        },
        {
            id: "empresa",
            title: "Visión de la Empresa",
            text: `
                Misión de la Empresa:
                "Ofrecer productos personalizados de alta calidad que permitan a nuestros clientes expresar su estilo y creatividad de manera única. Nos esforzamos por brindar una experiencia de compra fácil y satisfactoria, apoyada en innovación constante, sostenibilidad y un compromiso sólido con la excelencia y la transparencia. A través de una atención cercana y confiable, buscamos construir relaciones duraderas con nuestros clientes, inspirando y facilitando la creación de artículos que cuenten su historia y reflejen su identidad."
            `,
            imgSrc: [opti, comu],
        },
    ];

    return (
        <div>
            <div className="navbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="content-container">
                {tabs.map((tab) => (
                    <TabContent
                        key={tab.id}
                        title={tab.title}
                        text={tab.text}
                        values={tab.values}
                        imgSrc={tab.imgSrc}
                        isActive={activeTab === tab.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default OurSite;
