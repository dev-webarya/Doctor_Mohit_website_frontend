import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar, UserRound, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Appointments', href: '/appointments' },
  { name: 'Contact', href: '/contact' },
  { name: 'Resources', href: '/resources' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-trust-navy text-white text-xs hidden md:block border-b border-border/50">
        <div className="container mx-auto container-padding py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-white/90">Mon-Fri: <span className="whitespace-nowrap">9:00 AM – 10:00 AM</span> & <span className="whitespace-nowrap">5:45 PM – 9:00 PM</span> | Sat-Sun: <span className="whitespace-nowrap">10:30 AM – 2:00 PM</span> | Wed: Closed</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+919972899728" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 9972899728</span>
              </a>
              <a href="mailto:info@careandcure.com" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@careandcure.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <nav className="container mx-auto container-padding" aria-label="Main navigation">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
  <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden border">
    <img
      src="/logo.jpeg"
      alt="Care & Cure Centre Logo"
      className="w-full h-full object-contain"
    />
  </div>

  <div className="hidden sm:block min-w-fit">
    <h1 className="text-sm lg:text-base font-bold text-foreground leading-tight whitespace-nowrap">
       Care & Cure Centre
    </h1>
    <p className="text-xs text-muted-foreground">Complete Women and Child Health Care</p>
  </div>
</Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 mx-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:+919972899728"
              className="ml-2 p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              aria-label="Call us"
              title="Call us at +91 9972899728"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Login">
                  <UserRound className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link to="/login/admin">Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login/doctor">Doctor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login/patient">Patient</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/register/patient">New Patient Registration</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/appointments">
              <Button className="cta-button">
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
                <a 
                  href="tel:+919876543210" 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted text-foreground font-medium"
                >
                  <Phone className="w-5 h-5 text-primary" />
                   +91 9972899728
                </a>
                <Link to="/appointments" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full cta-button">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Button>
                </Link>
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    to="/login/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3"
                  >
                    <UserRound className="w-5 h-5 text-primary" />
                    Login as Admin
                  </Link>
                  <Link
                    to="/login/doctor"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3"
                  >
                    <UserRound className="w-5 h-5 text-primary" />
                    Login as Doctor
                  </Link>
                  <Link
                    to="/login/patient"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3"
                  >
                    <UserRound className="w-5 h-5 text-primary" />
                    Login as Patient
                  </Link>
                  <Link
                    to="/register/patient"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3"
                  >
                    <UserRound className="w-5 h-5 text-primary" />
                    New Patient Registration
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  );
};

export default Header;
