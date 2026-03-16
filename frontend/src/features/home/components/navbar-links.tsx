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
          "Explora nuestro catálogo completo de colchones, sommiers y ropa de cama",
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
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {catalogItem.label}
                              </div>
                              {catalogItem.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                  isActive &&
                                    "bg-accent text-accent-foreground",
                                )
                              }
                            >
                              <div className="text-sm font-medium leading-none">
                                {dropdownItem.label}
                              </div>
                              {dropdownItem.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
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
