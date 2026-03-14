import { Link } from 'react-router-dom';
import {Phone,Mail,MapPin,Clock,Facebook,Instagram,Twitter,Youtube,MessageCircle,} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-trust-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto container-padding section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.jpeg"
                  alt="Care & Cure Centre Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[hsl(160_75%_65%)]">Care & Cure Centre</h3>
                <p className="text-sm text-white/90">Complete Women and Child Health Care</p>
              </div>
            </div>

            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Your trusted healthcare partner in Bangalore. Providing expert
              pediatric, neonatal, and fertility care with compassion and
              excellence.
            </p>

            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[hsl(160_75%_65%)] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Services', href: '/services' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Book Appointment', href: '/appointments' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Patient Resources', href: '/resources' },
                { name: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white hover:text-primary transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-[hsl(160_75%_65%)] mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Pediatric Care',
                'Neonatal Care',
                'Fertility Treatment',
                'Vaccinations',
                'Growth Clinic',
                'Asthma & Allergy Care',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white hover:text-primary transition-colors text-sm font-medium"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-[hsl(160_75%_65%)] mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <a
                  href="https://www.google.com/maps/place/Kundalahalli,+Brookefield,+Bengaluru,+Karnataka/@12.9677234,77.7163806,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae1223dfa82e0f:0x6ab167aa7f218353!8m2!3d12.9689968!4d77.7208853!16s%2Fg%2F11fl3zbxtk?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  <span className="text-white text-sm">
                    1st Floor, Namrata Icon, ITPL Main Road,Above Midas Daily Super Market,Kundalahalli Extension,
                    <br />
                    Bengaluru, Karnataka – 560037
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+919972899728"
                  className="text-white hover:text-primary transition-colors text-sm font-medium whitespace-nowrap"
                >
                  +91 9972899728
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@careandcure.com"
                  className="text-white hover:text-primary transition-colors text-sm font-medium"
                >
                  info@careandcure.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div className="text-white text-sm">
                  <p>Monday–Friday: <span className="whitespace-nowrap">9:00 AM – 10:00 AM</span> & <span className="whitespace-nowrap">5:45 PM – 9:00 PM</span></p>
                  <p>Saturday–Sunday: <span className="whitespace-nowrap">10:30 AM – 2:00 PM</span></p>
                  <p>Wednesday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar (REPLACED CONTENT) */}
      <div className="border-t border-white/10">
        <div className="container mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">

            <p>© {currentYear} Care & Cure Centre. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              

              <span>Designed & Developed by</span>

              <a
                href="https://webarya.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 font-medium hover:underline"
              >
                WebArya
              </a>

              <a
                href="tel:+919187385124"
                className="flex items-center gap-1 text-green-500 hover:underline"
              >
                <Phone size={14} />
                +91 9187 385 124
              </a>

              <a
                href="https://wa.me/919187385124"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-green-500 hover:underline"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
