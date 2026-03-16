import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MenuIcon, XIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchProductsBar } from "@/components/search-products-bar";
import type { NavItem, NavDropdown } from "../types/navbar-types";
import type { CategoryItem } from "../types";

interface NavbarMobileProps {
  items: (NavItem | NavDropdown)[];
  mobileMenu: {
    openLabel: string;
    closeLabel: string;
    menuAriaLabel: string;
  };
  categories?: CategoryItem[];
  categoriesLoading?: boolean;
}

function isDropdown(item: NavItem | NavDropdown): item is NavDropdown {
  return "items" in item;
}

export function NavbarMobile({
  items,
  mobileMenu,
  categories,
  categoriesLoading,
}: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdowns([]);
  };

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeMobileMenu();
        buttonRef.current?.focus(); // Return focus to menu button
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

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
    <div className="lg:hidden">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? mobileMenu.closeLabel : mobileMenu.openLabel}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isOpen ? (
          <XIcon className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className="top-full right-0 left-0 z-50 absolute bg-background shadow-lg border-t max-h-[calc(100vh-4rem)] overflow-y-auto"
          role="menu"
          aria-labelledby="mobile-menu-button"
        >
          <div className="mx-auto px-4 py-6 container">
            {/* Search Bar Section */}
            <div className="mb-6 pb-4 border-b border-border">
              <SearchProductsBar
                variant="default"
                className="w-full"
                placeholder="Buscar productos..."
              />
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1" aria-label={mobileMenu.menuAriaLabel}>
              {items.map((item) => (
                <div key={item.label}>
                  {isDropdown(item) ? (
                    <Collapsible
                      open={openDropdowns.includes(item.label)}
                      onOpenChange={() => toggleDropdown(item.label)}
                    >
                      <CollapsibleTrigger className="flex justify-between items-center hover:bg-accent px-3 py-2 rounded-md w-full font-medium text-left hover:text-accent-foreground">
                        <span>{item.label}</span>
                        <ChevronDownIcon
                          className={cn(
                            "w-4 h-4 transition-transform",
                            openDropdowns.includes(item.label) && "rotate-180",
                          )}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 pl-4">
                        {item.label === "Catálogo"
                          ? buildCatalogItems().map((catalogItem) => (
                              <NavLink
                                key={catalogItem.href}
                                to={catalogItem.href}
                                onClick={closeMobileMenu}
                                className="block hover:bg-accent px-3 py-2 rounded-md text-sm transition-colors hover:text-accent-foreground"
                              >
                                <div>{catalogItem.label}</div>
                                {catalogItem.description && (
                                  <div className="mt-1 text-muted-foreground text-xs">
                                    {catalogItem.description}
                                  </div>
                                )}
                              </NavLink>
                            ))
                          : item.items.map((dropdownItem) => (
                              <NavLink
                                key={dropdownItem.href}
                                to={dropdownItem.href}
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                  cn(
                                    "block hover:bg-accent px-3 py-2 rounded-md text-sm transition-colors hover:text-accent-foreground",
                                    isActive &&
                                      "bg-accent text-accent-foreground font-medium",
                                  )
                                }
                              >
                                <div>{dropdownItem.label}</div>
                                {dropdownItem.description && (
                                  <div className="mt-1 text-muted-foreground text-xs">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </NavLink>
                            ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        cn(
                          "block hover:bg-accent px-3 py-2 rounded-md font-medium transition-colors hover:text-accent-foreground",
                          isActive && "bg-accent text-accent-foreground",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
