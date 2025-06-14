
import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-cornsilk dark:bg-pakistan/95">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="h-1 w-24 bg-tiger mx-auto"></div>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Let's discuss how we can collaborate on your next project or opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Mail className="mr-2" size={20} />
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-muted bg-white/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-muted bg-white/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-muted bg-white/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Write your message here..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center w-full py-3 px-6 rounded-md text-cornsilk transition-all
                  ${isSubmitting ? "bg-muted cursor-not-allowed" : "bg-dark-moss hover:bg-pakistan"}`}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </button>
              
              {isSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md animate-fade-in">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          <div className="bg-white/50 dark:bg-pakistan-green/30 p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Let's Connect</h3>
            <p className="mb-6">
              I'm always interested in discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-muted-foreground">Türkiye</p>
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a 
                  href="mailto:saleh.k.aljaberi@gmail.com" 
                  className="text-secondary hover:underline"
                >
                  saleh.k.aljaberi@gmail.com
                </a>
              </div>
              <div>
                <h4 className="font-semibold">Languages</h4>
                <p className="text-muted-foreground">English, Arabic, Turkish</p>
              </div>
              
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Connect with me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/saleh_aljaberi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-border"
                    aria-label="Instagram"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/saleh-aljaberi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-border"
                    aria-label="LinkedIn"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a
                    href="https://github.com/SalehAljaberi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-border"
                    aria-label="GitHub"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
