
import { Instagram, Linkedin, Mail, Github } from "lucide-react";
import { useState } from "react";

interface SocialLinksProps {
  vertical?: boolean;
}

const SocialLinks = ({ vertical = false }: SocialLinksProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const socialData = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/saleh_aljaberi/",
      color: "hover:text-[#E1306C]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/saleh-aljaberi/",
      color: "hover:text-[#0077B5]",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:saleh.k.aljaberi@gmail.com",
      color: "hover:text-secondary",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/SalehAljaberi",
      color: "hover:text-foreground",
    },
  ];

  return (
    <div
      className={`fixed ${
        vertical ? "right-6 top-1/2 -translate-y-1/2 z-40" : "left-6 bottom-6 z-40"
      } transition-all duration-300`}
    >
      <div
        className={`${
          vertical
            ? "flex flex-col space-y-4"
            : "flex space-x-4 items-center"
        } transition-all duration-500`}
      >
        {socialData.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`icon-border bg-cornsilk text-foreground ${social.color}`}
            aria-label={social.name}
          >
            <social.icon size={vertical ? 20 : 18} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
