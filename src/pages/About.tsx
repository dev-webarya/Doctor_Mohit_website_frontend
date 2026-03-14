import { Award, GraduationCap, Heart, Baby, Stethoscope, Users, Star, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us | Care and Cure Fertility Centre - Pediatrics & Fertility Clinic</title>
        <meta name="description" content="Learn about Care and Cure Fertility Centre, founded to provide compassionate healthcare for children and families in Bangalore. Meet our expert doctors Dr. Mohit Singhal and Dr. Himanshu Singhal." />
        <meta name="keywords" content="about care and cure, pediatrician, neonatologist, fertility specialist, doctor profiles, clinic mission" />
        <meta property="og:title" content="About Us | Care and Cure Fertility Centre" />
        <meta property="og:description" content="Compassionate healthcare for children and families in Bangalore." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://careandcure.com/about" />
      </Helmet>
      {/* Hero Section */}
      <section className="py-4 md:py-6 bg-gradient-to-br from-medical-blue-light via-background to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">About Care & Cure Centre</h1>
            <p className="text-lg text-muted-foreground">
              Founded with a vision to provide compassionate and comprehensive healthcare for children and families, 
              Care & Cure Centre has been serving the Bangalore community with excellence and dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-6 md:py-8 bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At Care & Cure Centre, we believe every child deserves the best possible start in life, 
                and every family deserves compassionate support in their journey. Our mission is to provide 
                world-class pediatric, neonatal, and fertility care in a warm, family-friendly environment.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Heart, text: 'Compassionate Care' },
                  { icon: Award, text: 'Clinical Excellence' },
                  { icon: Users, text: 'Family-Centered' },
                  { icon: Star, text: 'Patient Satisfaction' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden border border-border/50">
              <img 
                src="/image copy.png" 
                alt="Clinic Photo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Doctors */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expert Doctors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated physicians who lead our team with expertise and compassion.
            </p>
          </div>

          {/* Dr. Mohit Singhal */}
          <div className="mb-16">
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="aspect-[3/4] lg:aspect-auto overflow-hidden">
                  <img 
                    src= "./Dr. Mohit.png" 
                    alt="Dr. Mohit Singhal" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="lg:col-span-2 p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Dr. Mohit Singhal</h3>
                    <p className="text-primary font-semibold text-lg">Consultant Pediatrician & Neonatologist</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Qualifications
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>MBBS (2001) - Maharshi Dayanand University, Rohtak</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>MD Pediatrics (2005) - Rajiv Gandhi University of Health Sciences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>DNB Neonatology (2009) - Manipal Institute</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>Fellowship in PGPN - Boston, USA</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Pediatrics', 'Neonatology', 'Newborn Intensive Care', 'Child Development', 'Vaccination'].map((specialty) => (
                        <span key={specialty} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
                    <Quote className="w-6 h-6 text-primary mb-2" />
                    <p className="text-muted-foreground italic">
                      "Every child is unique, and I believe in providing personalized care that addresses 
                      not just their physical health, but their overall development and well-being. 
                      My goal is to partner with parents in raising healthy, happy children."
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Dr. Himanshu Singhal */}
          <div>
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-0">
                <div className="aspect-[3/4] lg:aspect-auto overflow-hidden lg:order-2">
                  <img 
                    src="/Dr.Himanshu.png" 
                    alt="Dr. Himanshu Singhal" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="lg:col-span-2 p-8 lg:order-1">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Dr. Himanshu Singhal</h3>
                    <p className="text-primary font-semibold text-lg">Fertility Specialist</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Qualifications
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>Expert in Fertility & Reproductive Medicine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>Specialized Training in Advanced IVF Techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>15+ Years Experience</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Fertility Treatment', 'IVF', 'Infertility Care', 'Reproductive Health', 'Family Planning'].map((specialty) => (
                        <span key={specialty} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
                    <Quote className="w-6 h-6 text-primary mb-2" />
                    <p className="text-muted-foreground italic">
                      "I understand that the journey to parenthood can be emotionally challenging. 
                      My approach combines the latest medical advances with compassionate care, 
                      supporting couples every step of the way towards building their family."
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What sets Care & Cure Centre apart from other healthcare providers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Expert Team', description: 'Board-certified specialists with decades of combined experience.' },
              { title: 'Modern Facility', description: 'State-of-the-art equipment and child-friendly environment.' },
              { title: 'Personalized Care', description: 'Tailored treatment plans for each patient\'s unique needs.' },
              { title: '24/7 Support', description: 'Round-the-clock emergency care and parent support.' },
            ].map((item) => (
              <Card key={item.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
