import { useCartStore, selectCartItemCount } from "../store/cart-store";
import { useShallow } from "zustand/react/shallow";

/**
 * Custom hook for cart operations
 */
export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
    getTax,
    getTotal,
    getItem,
  } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      addItem: state.addItem,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
      getItemCount: state.getItemCount,
      getSubtotal: state.getSubtotal,
      getTax: state.getTax,
      getTotal: state.getTotal,
      getItem: state.getItem,
    })),
  );

  return {
    items,
    itemCount: getItemCount(),
    subtotal: getSubtotal(),
    tax: getTax(),
    total: getTotal(),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
    isEmpty: items.length === 0,
  };
}

/**
 * Optimized hook for cart item count (for navbar badge)
 */
export function useCartItemCount() {
  return useCartStore(selectCartItemCount);
}
