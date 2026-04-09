import type { NavbarConfig } from "../types/navbar-types";

export const navbarConfig: NavbarConfig = {
  logo: {
    text: "Flexigom",
    href: "/",
  },
  mainNavigation: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Catálogo",
      items: [
        {
          label: "Todos los Productos",
          href: "/productos",
          description:
            "Explora nuestro catálogo completo de colchones y sommiers",
        },
      ],
    },
    {
      label: "Ayuda",
      items: [
        {
          label: "Preguntas Frecuentes",
          href: "/faq",
          description: "Resolvé tus dudas sobre nuestros productos y servicios",
        },
        {
          label: "Garantías",
          href: "/garantias",
          description: "Información sobre garantías de nuestros productos",
        },
        {
          label: "Entregas",
          href: "/entregas",
          description: "Conocé nuestras zonas de entrega y tiempos",
        },
      ],
    },
    {
      label: "Contacto",
      href: "/contacto",
    },
  ],
  authNavigation: {
    loginLabel: "Iniciar Sesión",
    registerLabel: "Registrarse",
    loginHref: "/auth/login",
    registerHref: "/auth/register",
    logoutLabel: "Cerrar Sesión",
    accountLabel: "Mi Cuenta",
  },
  mobileMenu: {
    openLabel: "Abrir menú",
    closeLabel: "Cerrar menú",
    menuAriaLabel: "Menú de navegación principal",
  },
};
