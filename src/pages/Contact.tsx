import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Contact = () => {
  return (
    <Layout>
      <Helmet>
        <title>Contact Us | Care & Cure Centre - Bangalore</title>
        <meta name="description" content="Contact Care & Cure Centre in Bangalore. Phone: +91 9972899728. Email: info@careandcure.com. Visit our clinic in Kundalahalli for pediatric and fertility services. Complete Women and Child Health Care." />
        <meta name="keywords" content="contact us, clinic location, phone number, email, directions, bangalore clinic" />
        <meta property="og:title" content="Contact Us | Care & Cure Centre" />
        <meta property="og:description" content="Get in touch with Care & Cure Centre for appointments and inquiries." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://careandcure.com/contact" />
      </Helmet>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-medical-blue-light via-background to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We're here to help. Reach out to us through any of the channels below or visit our clinic in Bangalore.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container mx-auto container-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <a href="tel: +91 99728 99728" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-primary font-medium whitespace-nowrap"> +91 99728 99728</p>
                  <p className="text-sm text-muted-foreground mt-1">Tap to call</p>
                </CardContent>
              </Card>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/919880928877?text=Hello! I would like to know more about Care & Cure Centre."
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[hsl(142_70%_45%)]/10 flex items-center justify-center group-hover:bg-[hsl(142_70%_45%)]/20 transition-colors">
                    <MessageCircle className="w-7 h-7 text-[hsl(142_70%_45%)]" />
                  </div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-[hsl(142_70%_45%)] font-medium"> +91 9880928877</p>
                  <p className="text-sm text-muted-foreground mt-1">Chat with us</p>
                </CardContent>
              </Card>
            </a>

            {/* Email */}
            <a href="mailto:info@careandcure.com" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Mail className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-secondary font-medium">info@careandcure.com</p>
                  <p className="text-sm text-muted-foreground mt-1">Send us an email</p>
                </CardContent>
              </Card>
            </a>

            {/* Hours */}
            <Card className="h-full">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Clinic Hours</h3>
                <p className="text-muted-foreground text-sm">Monday–Friday: <span className="whitespace-nowrap">9:00 AM – 10:00 AM</span> & <span className="whitespace-nowrap">5:45 PM – 9:00 PM</span></p>
                <p className="text-muted-foreground text-sm">Saturday–Sunday: <span className="whitespace-nowrap">10:30 AM – 2:00 PM</span></p>
                <p className="text-muted-foreground text-sm">Wednesday: Closed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map and Address */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Address Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Visit Our Clinic</h2>
              
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Address</h3>
                      <p className="text-muted-foreground">
                        Care & Cure Centre<br />
                       1st floor, Namrata Icon, ITPL Main Rd, above Midas Daily Super Market, Kundalahalli Extension, Bengaluru, Karnataka 560037<br />
                        
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Clinic Timings</h3>
                      <div className="text-muted-foreground space-y-3">
                        <div className="flex flex-col gap-1">
                          <span>Monday–Friday: <span className="whitespace-nowrap">9:00 AM – 10:00 AM</span> & <span className="whitespace-nowrap">5:45 PM – 9:00 PM</span></span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span>Saturday–Sunday: <span className="whitespace-nowrap">10:30 AM – 2:00 PM</span></span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span>Wednesday: Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Landmarks & Directions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Kundalahalli Extension Area</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Above Midas Daily Super Market</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>ITPL Main Road</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Parking available on premises</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.google.com/maps/place/Kundalahalli,+Brookefield,+Bengaluru,+Karnataka/@12.9677234,77.7163806,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae1223dfa82e0f:0x6ab167aa7f218353!8m2!3d12.9689968!4d77.7208853!16s%2Fg%2F11fl3zbxtk?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="cta-button w-full sm:w-auto">
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </Button>
                </a>
                <a href="tel: +919972899728">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Phone className="w-4 h-4" />
                    Call for Directions
                  </Button>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-square lg:aspect-auto rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.936623659163!2d77.7208853!3d12.9689968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1223dfa82e0f:0x6ab167aa7f218353!2sKundalahalli!5e0!3m2!1sen!2sin!4v1707988800000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Care & Cure Centre Location"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
