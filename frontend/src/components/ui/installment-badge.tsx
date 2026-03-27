import { cn } from "@/lib/utils";
import { DEFAULT_INSTALLMENTS } from "@/lib/constants";

interface InstallmentBadgeProps {
  installments?: number;
  className?: string;
}

export function InstallmentBadge({
  installments = DEFAULT_INSTALLMENTS,
  className,
}: InstallmentBadgeProps) {
  if (!installments || installments <= 1) return null;

  return (
    <span
      className={cn(
        "inline-block bg-green-600 text-white font-bold text-[11px] sm:text-xs px-2 py-0.5 rounded-md whitespace-nowrap",
        className
      )}
    >
      {installments} cuotas sin interés
    </span>
  );
}
