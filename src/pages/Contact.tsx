import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Contact = () => {
  return (
    <Layout>
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
            <a href="tel:+919876543210" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-primary font-medium">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground mt-1">Tap to call</p>
                </CardContent>
              </Card>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://wa.me/919876543210?text=Hello! I would like to know more about Care and Cure Centre."
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
                  <p className="text-[hsl(142_70%_45%)] font-medium">+91 98765 43210</p>
                  <p className="text-sm text-muted-foreground mt-1">Chat with us</p>
                </CardContent>
              </Card>
            </a>

            {/* Email */}
            <a href="mailto:info@careandcure.in" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Mail className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-secondary font-medium">info@careandcure.in</p>
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
                <p className="text-muted-foreground text-sm">Mon - Sat: 9AM - 8PM</p>
                <p className="text-muted-foreground text-sm">Sunday: 10AM - 2PM</p>
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
                        Care and Cure Centre<br />
                        123 Healthcare Avenue<br />
                        Koramangala, Bangalore 560034<br />
                        Karnataka, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Clinic Timings</h3>
                      <div className="text-muted-foreground space-y-1">
                        <div className="flex justify-between gap-8">
                          <span>Monday - Saturday</span>
                          <span className="font-medium text-foreground">9:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span>Sunday</span>
                          <span className="font-medium text-foreground">10:00 AM - 2:00 PM</span>
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
                    <span>Near Koramangala Water Tank</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Opposite City Center Mall</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>5 minutes from Sony World Junction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Parking available on premises</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=12.934533,77.614268" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="cta-button w-full sm:w-auto">
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </Button>
                </a>
                <a href="tel:+919876543210">
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965239566977!2d77.61426831482225!3d12.934533890876977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1459dd44a355%3A0x8c89e1e89a6a35e9!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Care and Cure Centre Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-destructive/5 border-y border-destructive/20">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-destructive mb-2">Emergency Contact</h3>
              <p className="text-muted-foreground">
                For urgent pediatric or neonatal emergencies, please call immediately.
              </p>
            </div>
            <a href="tel:+919876543210">
              <Button size="lg" variant="destructive" className="w-full md:w-auto">
                <Phone className="w-5 h-5" />
                Call Emergency Line
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
