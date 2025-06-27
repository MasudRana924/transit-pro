import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Send, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const shouldShow = window.pageYOffset > 300;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white pt-16 pb-8 w-full">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                TransitPro
              </h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Your trusted partner for seamless bus travel booking and journey planning across the country. Experience comfort and reliability with every journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {['Search Buses', 'My Bookings', 'Cancel Ticket', 'Print Ticket'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="group flex items-center text-blue-100 hover:text-white transition-colors"
                    onMouseEnter={() => setIsHovered(link)}
                    onMouseLeave={() => setIsHovered('')}
                  >
                    <ArrowRight className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                      isHovered === link ? 'translate-x-2' : ''
                    }`} />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: '123 Transit Street, Bus City', href: '#' },
                { Icon: Phone, text: '1-800-TRANSIT', href: 'tel:1800TRANSIT' },
                { Icon: Mail, text: 'support@transitpro.com', href: 'mailto:support@transitpro.com' }
              ].map(({ Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors group"
                  >
                    <div className="p-2 bg-blue-800/50 rounded-lg group-hover:bg-blue-700/50 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-blue-100">
              Subscribe to our newsletter for exclusive deals and travel insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-blue-800/50 text-white placeholder-blue-200/50 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-12">
          {socialLinks.map(({ icon: Icon, label, color }) => (
            <a
              key={label}
              href="#"
              className={`group p-3 bg-blue-800/30 rounded-lg transition-all hover:bg-blue-700/30 ${color}`}
              aria-label={label}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-blue-200">
            <p>&copy; 2025 TransitPro. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {[
                { name: "Privacy Policy", path: "/privacy/policy" },
                { name: "Terms of Service", path: "/terms/condition" },
                { name: "FAQ", path: "/faq" }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-white transition-colors hover:underline underline-offset-4"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg 
                     transition-all hover:scale-110 animate-pulse"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;