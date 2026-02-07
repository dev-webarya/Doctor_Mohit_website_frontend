import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar, Star, Users, Award, Clock, Stethoscope, Baby, Heart, Syringe, Activity, Apple, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-medical-blue-light via-background to-warm-peach overflow-hidden">
        <div className="container mx-auto container-padding section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="trust-badge mb-6">
                <Award className="w-4 h-4" />
                Trusted by 10,000+ Families
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Caring for Your <span className="text-primary">Little Ones</span> & <span className="text-secondary">Growing Families</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Expert pediatric, neonatal, and fertility care in the heart of Bangalore. Where compassion meets medical excellence.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/appointments">
                  <Button className="w-full sm:w-auto cta-button text-base">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </Button>
                </Link>
                <a 
                  href="https://wa.me/919876543210?text=Hello! I would like to book an appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full sm:w-auto whatsapp-button text-base">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="tel:+919876543210" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Call Us</p>
                    <p className="font-semibold text-foreground">+91 98765 43210</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Clinic Hours</p>
                    <p className="font-semibold text-foreground">Mon-Sat: 9AM-8PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative animate-slide-in-right">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-border/50 overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Stethoscope className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Doctor/Clinic Photo</p>
                </div>
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 md:left-auto md:-right-6 bg-card rounded-xl shadow-lg p-4 border border-border/50 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-medical-green/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-medical-green" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">4.9</p>
                    <p className="text-xs text-muted-foreground">Patient Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '10,000+', label: 'Happy Families' },
              { icon: Award, value: '20+', label: 'Years Experience' },
              { icon: Star, value: '4.9', label: 'Patient Rating' },
              { icon: Clock, value: '24/7', label: 'Emergency Care' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Doctors */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Doctors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of highly qualified specialists is dedicated to providing the best care for you and your family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Dr. Mohit Singhal */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                    <Baby className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Doctor Photo</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Mohit Singhal</h3>
                <p className="text-primary font-medium mb-3">Pediatrics & Neonatology</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>MBBS, MD (Pediatrics), DNB (Neonatology)</p>
                  <p>Fellowship PGPN - Boston, USA</p>
                  <p>20+ Years Experience</p>
                </div>
                <Link to="/about">
                  <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Dr. Himanshu Singhal */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Doctor Photo</p>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">Dr. Himanshu Singhal</h3>
                <p className="text-secondary font-medium mb-3">Fertility Specialist</p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p>Fertility & Reproductive Medicine Expert</p>
                  <p>Advanced IVF & Infertility Treatment</p>
                  <p>Compassionate Family Care</p>
                </div>
                <Link to="/about">
                  <Button variant="outline" className="w-full">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare services for children and families at every stage of life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, title: 'OPD Services', description: 'General consultations and routine health checkups for children of all ages.' },
              { icon: Baby, title: 'Newborn Care', description: 'Expert neonatal care with NICU expertise for premature and sick newborns.' },
              { icon: Syringe, title: 'Vaccinations', description: 'Complete immunization schedules and vaccine counseling for your child.' },
              { icon: Activity, title: 'Growth Clinic', description: 'Monitoring and managing growth & developmental milestones.' },
              { icon: Apple, title: 'Nutrition Counseling', description: 'Personalized dietary guidance for healthy child development.' },
              { icon: Heart, title: 'Fertility Services', description: 'Comprehensive fertility treatments and reproductive healthcare.' },
            ].map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Parents Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by thousands of families across Bangalore.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Priya Sharma', text: 'Dr. Mohit is incredibly patient and thorough. My son was very comfortable during the consultation. Highly recommend!', rating: 5 },
              { name: 'Rahul Menon', text: 'The newborn care at Care and Cure is exceptional. The team was with us 24/7 during our baby\'s NICU stay.', rating: 5 },
              { name: 'Anita Krishnan', text: 'After years of trying, Dr. Himanshu helped us start our family. Forever grateful for her expertise and compassion.', rating: 5 },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warm-coral" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Clinic</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-muted-foreground">123 Healthcare Avenue, Koramangala, Bangalore 560034</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Clinic Hours</h4>
                    <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-muted-foreground">Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Contact</h4>
                    <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a>
                  </div>
                </div>
              </div>
              <Link to="/contact">
                <Button className="cta-button">Get Directions</Button>
              </Link>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-[4/3] rounded-2xl bg-muted border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965239566977!2d77.61426831482225!3d12.934533890876977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1459dd44a355%3A0x8c89e1e89a6a35e9!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Care and Cure Centre Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book an Appointment?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Our team is ready to provide you and your family with the best healthcare experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointments">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                <Calendar className="w-5 h-5" />
                Book Online
              </Button>
            </Link>
            <a href="tel:+919876543210">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
