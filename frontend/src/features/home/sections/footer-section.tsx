import { Link } from "react-router";
import {
  PhoneIcon,
  MessageCircleIcon,
  MapPinIcon,
  FacebookIcon,
  InstagramIcon,
  ClockIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { footerConfig } from "../config/footer-config";
import type { FooterSectionProps, FooterLinkGroup } from "../types";

interface FooterLinkGroupComponentProps {
  group: FooterLinkGroup;
}

function FooterLinkGroupComponent({ group }: FooterLinkGroupComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-white text-lg">{group.title}</h3>
      <ul className="space-y-2">
        {group.links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              className="text-gray-300 hover:text-red-400 text-sm transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterSection({ config, className }: FooterSectionProps = {}) {
  const footerData = { ...footerConfig, ...config };

  return (
    <footer className={cn("bg-black text-white", className)}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="font-bold text-red-600 text-xl">
              {footerData.companyInfo.name}
            </h2>
            <p className="text-gray-300 text-sm">
              {footerData.companyInfo.description}
            </p>
          </div>

          {/* Navigation Links */}
          <FooterLinkGroupComponent group={footerData.navigation.company} />

          {/* Help Links */}
          <FooterLinkGroupComponent group={footerData.navigation.help} />

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm">Contacto</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-red-400" />
                <span className="text-gray-300 text-sm">
                  {footerData.contact.address.street},{" "}
                  {footerData.contact.address.city}
                </span>
              </div>

              {footerData.contact.phones.map((phone, idx) => (
                <div key={idx} className="space-y-1 mt-2">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-red-400" />
                    <span className="w-12 font-medium text-gray-400 text-xs">
                      {phone.name}:
                    </span>
                    <a
                      href={`tel:${phone.number}`}
                      className="text-gray-300 hover:text-red-400 text-sm transition-colors"
                    >
                      {phone.number}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageCircleIcon className="w-4 h-4 text-red-400" />
                    <span className="w-12 font-medium text-gray-400 text-xs">
                      {phone.name}:
                    </span>
                    <a
                      href={`https://wa.me/${phone.clean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-red-400 text-sm transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="w-4 h-4 text-red-400" />
                <span className="font-medium text-white text-sm">Horarios</span>
              </div>
              <div className="space-y-1 text-gray-300 text-xs">
                <p>Lunes a Viernes: 8:30 a 13 y de 17 a 20</p>
                <p>Sábados: 9 a 13</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="bg-gray-800 my-6" />

        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 sm:text-left text-center">
          <div className="flex flex-col gap-1 sm:text-left text-center">
            <p className="text-gray-400 text-sm">
              © {footerData.copyright.year} {footerData.companyInfo.name}.{" "}
              {footerData.copyright.text}
            </p>
            <p className="text-gray-500 text-[10px] sm:text-xs">
              Desarrollado por{" "}
              <a
                href="https://asomelab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors duration-300 hover:underline"
              >
                ASOME Lab
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {footerData.social.facebook && (
              <a
                href={footerData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}
            {footerData.social.instagram && (
              <a
                href={footerData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
