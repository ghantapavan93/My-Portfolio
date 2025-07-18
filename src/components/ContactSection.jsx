import { useState, useRef, useEffect } from 'react'
import { Send, Copy, Check, Mail, MessageSquare, User } from 'lucide-react'
import { Button } from './ui/button'
import confetti from 'canvas-confetti'
import emailjs from '@emailjs/browser'

export function ContactSection() {
  const [activeTab, setActiveTab] = useState('email');
  const [copied, setCopied] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sectionAnimated, setSectionAnimated] = useState(false);
  const sectionRef = useRef(null);
  const contactEmail = "gpavankalyan1102@gmail.com";
  
  // Handle intersection animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries[0].isIntersecting && !sectionAnimated && setSectionAnimated(true),
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, [sectionAnimated]);
  
  // Copy email to clipboard
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  // Handle form input changes
  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    
    try {
      const result = await emailjs.send(
        'service_pavankalyan',
        'template_pavankalyan',
        { name: formData.name, email: formData.email, message: formData.message },
        'nob1s8-BQqigGWF4S'
      );
      
      console.log('Email sent successfully:', result.text);
      setMessageSent(true);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.7 } });
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setMessageSent(false);
      }, 3000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-8 md:py-10 relative overflow-hidden bg-gradient-to-b from-background to-secondary/10"
      aria-labelledby="contact-heading"
    >
      {/* Background blur elements - simplified */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl transition-opacity duration-1000 ${sectionAnimated ? 'opacity-40' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 right-0 w-60 h-60 bg-primary/10 rounded-full blur-3xl transition-opacity duration-1000 delay-300 ${sectionAnimated ? 'opacity-40' : 'opacity-0'}`}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Compact header */}
        <div className={`text-center mb-6 transition-opacity duration-500 ${sectionAnimated ? 'opacity-100' : 'opacity-0'}`}>
          <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold mb-2">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>
        
        <div className={`max-w-2xl mx-auto transition-all duration-700 ${sectionAnimated ? 'opacity-100' : 'opacity-0 transform translate-y-5'}`}>
          {/* Tabs */}
          <div className="flex justify-center mb-4">
            <div className="bg-background/80 backdrop-blur-sm p-1 rounded-full shadow-inner border border-border/40">
              <div className="flex space-x-1">
                <TabButton 
                  active={activeTab === 'email'} 
                  onClick={() => setActiveTab('email')}
                  label="Email Me" 
                  icon={<Mail className="h-3.5 w-3.5 mr-1" />} 
                />
                <TabButton 
                  active={activeTab === 'message'} 
                  onClick={() => setActiveTab('message')}
                  label="Send Message" 
                  icon={<MessageSquare className="h-3.5 w-3.5 mr-1" />} 
                />
              </div>
            </div>
          </div>
          
          {/* Email tab content - more compact */}
          <div className={`bg-card border border-border/50 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${activeTab === 'email' ? 'opacity-100 max-h-[300px]' : 'opacity-0 max-h-0 pointer-events-none absolute'}`}>
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-1">Send Me an Email</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Drop me a line anytime. I usually respond within 24 hours.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-background px-3 py-2 rounded-md border border-border/50 text-sm font-medium flex items-center justify-between">
                      <span>{contactEmail}</span>
                      <button 
                        onClick={copyEmail}
                        className="ml-2 text-muted-foreground hover:text-primary transition-colors"
                        aria-label={copied ? "Email copied" : "Copy email address"}
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    
                    <Button 
                      asChild
                      size="sm"
                      className="bg-primary hover:bg-primary/90 gap-1 h-8 text-xs"
                    >
                      <a href={`mailto:${contactEmail}`}>
                        <Mail className="h-3 w-3" />
                        <span>Open Mail Client</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Message tab content - more compact */}
          <div className={`bg-card border border-border/50 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${activeTab === 'message' ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 pointer-events-none absolute'}`}>
            <div className="p-4 md:p-5">
              {messageSent ? (
                <div className="flex items-center gap-3 py-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-0.5">Message Sent!</h3>
                    <p className="text-xs text-muted-foreground">
                      Thanks for reaching out! I'll get back to you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-background w-full pl-9 pr-3 py-2 rounded-md border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium mb-1">
                      Your Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background w-full pl-9 pr-3 py-2 rounded-md border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium mb-1">
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-muted-foreground">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="bg-background w-full pl-9 pr-3 py-2 rounded-md border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                        placeholder="Hi Pavankalyan! I'd like to discuss a potential project..."
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-xs bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {error}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 gap-1.5 h-9 text-xs"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Simplified tab button component
function TabButton({ active, onClick, label, icon }) {
  return (
    <button
      type="button"
      className={`px-2.5 py-1.5 rounded-full text-xs flex items-center transition-all ${
        active 
          ? 'bg-primary text-white shadow-sm' 
          : 'hover:bg-background/80 text-muted-foreground'
      }`}
      onClick={onClick}
      aria-pressed={active}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
    </button>
  );
}