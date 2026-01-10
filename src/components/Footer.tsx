import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';


export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
      { icon: Github, url: "https://github.com/ritesh025", label: "GitHub" },
      { icon: Twitter, url: "https://x.com/mrraja018", label: "X" },
      {
        icon: Linkedin,
        url: "https://www.linkedin.com/in/riteshbafna25/",
        label: "LinkedIn",
      },
      {
        icon: Instagram,
        url: "https://www.instagram.com/mr_raja_018/",
        label: "Instagram",
      },
    ];

    return (
      <footer className="bg-zinc-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <p className="text-sm text-center">
              SneakTalk is built for private conversations. Two users, temporary
              messages, zero history.
            </p>
            <div className="flex justify-center gap-4 ">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    aria-label={link.label}
                    className="text-gray-400 hover:text-white hover:scale-118 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
            <div className="border-t border-gray-700 pt-4 text-center text-sm">
              <p>
                &copy; {currentYear} SneakTalk | Ritesh Bafna. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
};