import { createBrowserRouter, type RouteObject } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { ErrorBoundary } from "@/components/error-boundary";
import { rootLoader } from "./loaders/root-loader";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    loader: rootLoader,
    children: [
      {
        index: true,
        lazy: () => import("@/features/home/pages/home-page"),
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            lazy: () => import("@/features/auth/pages/login-page"),
          },
          {
            path: "register",
            lazy: () => import("@/features/auth/pages/register-page"),
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            loader: ({ request }) => {
              const url = new URL(request.url);
              const newUrl = new URL(url);
              newUrl.pathname = "/productos";
              return new Response(null, {
                status: 301,
                headers: {
                  Location: newUrl.toString(),
                },
              });
            },
          },
          {
            path: ":categorySlug",
            loader: ({ params }) => {
              const categorySlug = params.categorySlug;
              if (categorySlug) {
                return new Response(null, {
                  status: 301,
                  headers: {
                    Location: `/productos?category=${categorySlug}`,
                  },
                });
              }
              return null;
            },
          },
          {
            path: "product/:documentId",
            loader: async ({ params }) => {
              const documentId = params.documentId;
              if (documentId) {
                try {
                  const { ProductService } = await import(
                    "@/features/products/services/products-service"
                  );
                  const product = await ProductService.getProduct(documentId);
                  if (product?.slug) {
                    return new Response(null, {
                      status: 301,
                      headers: {
                        Location: `/productos/${product.slug}`,
                      },
                    });
                  }
                } catch (e) {
                  console.error("Failed to fetch product for redirect", e);
                }
              }
              return new Response(null, {
                status: 301,
                headers: {
                  Location: `/productos`,
                },
              });
            },
          },
        ],
      },
      {
        path: "checkout",
        children: [
          {
            index: true,
            loader: ({ request }) => {
              const url = new URL(request.url);
              const newUrl = new URL(url);
              newUrl.pathname = "/finalizar-compra";
              return new Response(null, {
                status: 301,
                headers: {
                  Location: newUrl.toString(),
                },
              });
            },
          },
          {
            path: "success",
            loader: () =>
              new Response(null, {
                status: 301,
                headers: { Location: "/finalizar-compra/exito" },
              }),
          },
          {
            path: "failure",
            loader: () =>
              new Response(null, {
                status: 301,
                headers: { Location: "/finalizar-compra/error" },
              }),
          },
          {
            path: "pending",
            loader: () =>
              new Response(null, {
                status: 301,
                headers: { Location: "/finalizar-compra/pendiente" },
              }),
          },
        ],
      },
      {
        path: "finalizar-compra",
        children: [
          {
            index: true,
            lazy: () => import("@/features/cart/pages/checkout-page"),
          },
          {
            path: "exito",
            lazy: () =>
              import("@/features/checkout/pages/payment-success-page"),
          },
          {
            path: "error",
            lazy: () =>
              import("@/features/checkout/pages/payment-failure-page"),
          },
          {
            path: "pendiente",
            lazy: () =>
              import("@/features/checkout/pages/payment-pending-page"),
          },
        ],
      },
      {
        path: "productos",
        children: [
          {
            index: true,
            lazy: () => import("@/features/products/pages/products-page"),
          },
          {
            path: ":slug",
            lazy: () => import("@/features/products/pages/product-detail-page"),
          },
        ],
      },
      {
        path: "contacto",
        lazy: () => import("@/features/pages/contacto-page"),
      },
      {
        path: "faq",
        lazy: () => import("@/features/pages/faq-page"),
      },
      {
        path: "garantias",
        lazy: () => import("@/features/pages/garantias-page"),
      },
      {
        path: "entregas",
        lazy: () => import("@/features/pages/entregas-page"),
      },
      {
        path: "terminos",
        lazy: () => import("@/features/pages/terminos-page"),
      },
      {
        path: "privacidad",
        lazy: () => import("@/features/pages/privacidad-page"),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

