import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FloatingSupport = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href="https://wa.me/+5493815824678?text=Hola,%20vi%20sus%20productos%20en%20la%20web%20y%20estoy%20interesado"
        target="_blank"
        rel="noopener noreferrer"
        className="right-6 bottom-6 z-50 fixed"
      >
        <Button
          variant="default"
          size="icon"
          className="flex justify-center items-center bg-green-500 hover:bg-green-600 shadow-lg rounded-full w-14 h-14 cursor-pointer"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      </a>
    </TooltipTrigger>
    <TooltipContent side="left">
      <p>¿Necesitas ayuda con tu compra? Contacta con un asesor</p>
    </TooltipContent>
  </Tooltip>
);
