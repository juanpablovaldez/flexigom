import type { FooterConfig } from "../types";

export const footerConfig: FooterConfig = {
  companyInfo: {
    name: "Flexigom",
    description: "Especialistas en colchones y sommiers.",
  },
  navigation: {
    company: {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "/" },
        { label: "Productos", href: "/products" },
        { label: "Nosotros", href: "/nosotros" },
        { label: "Contacto", href: "/contacto" },
      ],
    },
    products: {
      title: "Productos",
      links: [
        { label: "Colchones", href: "/products?category=colchones" },
        { label: "Sommiers", href: "/products?category=sommiers" },
      ],
    },
    help: {
      title: "Ayuda",
      links: [
        { label: "Preguntas Frecuentes", href: "/faq" },
        { label: "Garantías", href: "/garantias" },
        { label: "Entrega", href: "/entregas" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { label: "Términos", href: "/terminos" },
        { label: "Privacidad", href: "/privacidad" },
      ],
    },
  },
  contact: {
    title: "Contacto",
    address: {
      street: "Tucumán",
      city: "Argentina",
      province: "",
      country: "",
    },
    phone: "+54 381 527 7935",
    whatsapp: "+54 381 527 7935",
    email: "info@flexigom.com",
    operatingHours: {
      weekdays: "Lunes a Viernes de 8:30 a 13 y de 17 a 20",
      saturday: "Sábados de 9 a 13",
      sunday: "Domingos cerrado",
    },
  },
  social: {
    facebook: "https://facebook.com/flexigom",
    instagram: "https://instagram.com/flexigom",
    whatsapp: "https://wa.me/5493815277935",
  },
  copyright: {
    year: new Date().getFullYear(),
    text: "Todos los derechos reservados.",
  },
};
