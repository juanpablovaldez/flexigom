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
        { label: "Productos", href: "/productos" },
        { label: "Nosotros", href: "/nosotros" },
        { label: "Contacto", href: "/contacto" },
      ],
    },
    products: {
      title: "Productos",
      links: [
        { label: "Colchones", href: "/productos?category=colchones" },
        { label: "Sommiers", href: "/productos?category=sommiers" },
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
    phones: [
      { name: "Jessica", number: "+54 9 381 582-4678", clean: "5493815824678" },
      { name: "Martín", number: "+54 9 381 527-7935", clean: "5493815277935" },
    ],
    email: "flexituc@gmail.com",
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
