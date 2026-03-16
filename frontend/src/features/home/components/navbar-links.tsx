import { NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { NavItem, NavDropdown } from "../types/navbar-types";
import type { CategoryItem } from "../types";

interface NavbarLinksProps {
  items: (NavItem | NavDropdown)[];
  categories?: CategoryItem[];
  categoriesLoading?: boolean;
}

function isDropdown(item: NavItem | NavDropdown): item is NavDropdown {
  return "items" in item;
}

export function NavbarLinks({
  items,
  categories,
  categoriesLoading,
}: NavbarLinksProps) {
  const buildCatalogItems = () => {
    const staticItems = [
      {
        label: "Todos los Productos",
        href: "/products",
        description:
          "Explora nuestro catálogo completo de colchones y sommiers",
      },
    ];

    if (categoriesLoading) {
      return staticItems;
    }

    if (categories && categories.length > 0) {
      const dynamicItems = categories.map((category) => ({
        label: category.name,
        href: `/products?category=${category.slug}`,
        description: category.description,
      }));

      return [...staticItems, ...dynamicItems];
    }

    return staticItems;
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.label}>
            {isDropdown(item) ? (
              <>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-96 gap-1 p-2 max-h-[70vh] overflow-y-auto">
                    {item.label === "Catálogo"
                      ? buildCatalogItems().map((catalogItem) => (
                          <NavigationMenuLink key={catalogItem.href} asChild>
                            <NavLink
                              to={catalogItem.href}
                              className="block space-y-1 hover:bg-accent focus:bg-accent p-3 rounded-md outline-none no-underline leading-none transition-colors hover:text-accent-foreground focus:text-accent-foreground select-none"
                            >
                              <div className="font-medium text-sm leading-none">
                                {catalogItem.label}
                              </div>
                              {catalogItem.description && (
                                <p className="text-muted-foreground text-sm line-clamp-2 leading-snug">
                                  {catalogItem.description}
                                </p>
                              )}
                            </NavLink>
                          </NavigationMenuLink>
                        ))
                      : item.items.map((dropdownItem) => (
                          <NavigationMenuLink key={dropdownItem.href} asChild>
                            <NavLink
                              to={dropdownItem.href}
                              className={({ isActive }) =>
                                cn(
                                  "block space-y-1 hover:bg-accent focus:bg-accent p-3 rounded-md outline-none no-underline leading-none transition-colors hover:text-accent-foreground focus:text-accent-foreground select-none",
                                  isActive &&
                                    "bg-accent text-accent-foreground",
                                )
                              }
                            >
                              <div className="font-medium text-sm leading-none">
                                {dropdownItem.label}
                              </div>
                              {dropdownItem.description && (
                                <p className="text-muted-foreground text-sm line-clamp-2 leading-snug">
                                  {dropdownItem.description}
                                </p>
                              )}
                            </NavLink>
                          </NavigationMenuLink>
                        ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "group inline-flex justify-center items-center bg-transparent hover:bg-accent focus:bg-accent disabled:opacity-50 px-4 py-2 rounded-md w-max h-9 font-medium text-sm transition-colors hover:text-accent-foreground focus:text-accent-foreground disabled:pointer-events-none",
                      isActive && "bg-accent text-accent-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
