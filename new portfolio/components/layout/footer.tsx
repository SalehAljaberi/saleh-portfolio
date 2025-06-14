import Link from 'next/link';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background/30 border-t border-border mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold">Saleh Al-Jaberi</h3>
            <p className="text-muted-foreground">
              From Strategic Sales to Scalable Code—Building Products That Look Good & Work Well.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-earth-yellow transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground hover:text-earth-yellow transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-earth-yellow transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-earth-yellow transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.instagram.com/saleh_aljaberi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-earth-yellow transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/saleh-aljaberi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-earth-yellow transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/SalehAljaberi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-earth-yellow transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:saleh.k.aljaberi@gmail.com" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-earth-yellow transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">Stay updated with my latest projects and insights.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-earth-yellow"
              />
              <button className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-earth-yellow hover:bg-tigers-eye text-white px-4 py-1 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Saleh Al-Jaberi. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a 
              href="https://www.instagram.com/saleh_aljaberi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-earth-yellow transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/saleh-aljaberi/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-earth-yellow transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/SalehAljaberi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-earth-yellow transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="mailto:saleh.k.aljaberi@gmail.com" 
              className="text-muted-foreground hover:text-earth-yellow transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}