"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Instagram, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This would typically send the form data to a server
    console.log(values);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      form.reset();
      setIsSubmitted(false);
    }, 3000);
  }

  const socialLinks = [
    { 
      name: "Instagram", 
      icon: <Instagram className="h-5 w-5" />, 
      url: "https://www.instagram.com/saleh_aljaberi/",
      color: "hover:bg-pink-500"
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="h-5 w-5" />, 
      url: "https://www.linkedin.com/in/saleh-aljaberi/",
      color: "hover:bg-blue-600"
    },
    { 
      name: "GitHub", 
      icon: <Github className="h-5 w-5" />, 
      url: "https://github.com/SalehAljaberi",
      color: "hover:bg-gray-800"
    },
    { 
      name: "Email", 
      icon: <Mail className="h-5 w-5" />, 
      url: "mailto:saleh.k.aljaberi@gmail.com",
      color: "hover:bg-red-500"
    },
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background to-background/80 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Feel free to reach out for collaborations, inquiries, or just to say hello!
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 shadow-md"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-earth-yellow/20 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-earth-yellow" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for your message. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-earth-yellow hover:bg-tigers-eye text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
          
          {/* Contact Info - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Details */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-earth-yellow mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:saleh.k.aljaberi@gmail.com" 
                      className="text-muted-foreground hover:text-earth-yellow transition-colors"
                    >
                      saleh.k.aljaberi@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Linkedin className="h-5 w-5 text-earth-yellow mt-1 mr-3" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/in/saleh-aljaberi/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-earth-yellow transition-colors"
                    >
                      linkedin.com/in/saleh-aljaberi
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Github className="h-5 w-5 text-earth-yellow mt-1 mr-3" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a 
                      href="https://github.com/SalehAljaberi" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-earth-yellow transition-colors"
                    >
                      github.com/SalehAljaberi
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connect */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-muted-foreground mb-4">
                Follow me on social media or reach out directly for collaborations and opportunities.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md bg-background/50 hover:text-white transition-colors ${link.color}`}
                    aria-label={link.name}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Social sidebar */}
      <div 
        className={`fixed left-0 top-1/2 -translate-y-1/2 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%-10px)]'
        } transition-transform duration-300 z-50`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-r-lg shadow-lg p-3">
          <div className="flex flex-col gap-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-sidebar-item p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}