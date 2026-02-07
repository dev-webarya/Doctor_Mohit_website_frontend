import { Link } from 'react-router-dom';
import { Stethoscope, Baby, Syringe, Activity, Apple, Heart, Leaf, Brain, Wind, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const services = [
  {
    icon: Stethoscope,
    title: 'OPD Services',
    description: 'Comprehensive outpatient consultations for children of all ages. From routine checkups to addressing health concerns, our pediatric experts provide thorough evaluations and personalized care plans.',
    features: ['General Health Checkups', 'Sick Child Consultations', 'Follow-up Care', 'Health Certificates'],
    color: 'primary',
  },
  {
    icon: Baby,
    title: 'Newborn Care',
    description: 'Expert neonatal care for your precious newborn. With NICU expertise and experience caring for premature and sick babies, we ensure the best start for your little one.',
    features: ['Newborn Examinations', 'Premature Baby Care', 'NICU Support', 'Breastfeeding Counseling'],
    color: 'primary',
  },
  {
    icon: Syringe,
    title: 'Vaccinations',
    description: 'Complete immunization services following the latest national and international schedules. We ensure your child stays protected against preventable diseases.',
    features: ['Routine Immunizations', 'Catch-up Vaccinations', 'Travel Vaccines', 'Vaccine Counseling'],
    color: 'primary',
  },
  {
    icon: Activity,
    title: 'Growth & Development Clinic',
    description: 'Specialized monitoring and management of your child\'s growth patterns and developmental milestones. Early detection and intervention for optimal outcomes.',
    features: ['Growth Monitoring', 'Developmental Assessment', 'Height & Weight Tracking', 'Milestone Evaluation'],
    color: 'primary',
  },
  {
    icon: Wind,
    title: 'Asthma & Allergy Clinic',
    description: 'Comprehensive care for children with asthma, allergies, and respiratory conditions. We provide diagnosis, treatment, and long-term management strategies.',
    features: ['Allergy Testing', 'Asthma Management', 'Respiratory Care', 'Preventive Strategies'],
    color: 'primary',
  },
  {
    icon: Apple,
    title: 'Nutrition Counseling',
    description: 'Expert dietary guidance tailored to your child\'s needs. From infant feeding to adolescent nutrition, we help establish healthy eating habits for life.',
    features: ['Dietary Planning', 'Weight Management', 'Feeding Issues', 'Nutritional Supplements'],
    color: 'primary',
  },
  {
    icon: Heart,
    title: 'Fertility Services',
    description: 'Comprehensive fertility treatments led by Dr. Himanshu Singhal. We support couples on their journey to parenthood with advanced reproductive medicine.',
    features: ['Fertility Assessment', 'IVF Treatment', 'Infertility Management', 'Reproductive Counseling'],
    color: 'secondary',
  },
  {
    icon: Brain,
    title: 'Developmental Pediatrics',
    description: 'Specialized care for children with developmental delays, behavioral concerns, and learning difficulties. Multidisciplinary approach for comprehensive support.',
    features: ['ADHD Evaluation', 'Autism Screening', 'Learning Disabilities', 'Behavioral Support'],
    color: 'primary',
  },
  {
    icon: Leaf,
    title: 'Preventive Care',
    description: 'Proactive healthcare focused on preventing illness and promoting wellness. Regular screenings and health education for lasting well-being.',
    features: ['Health Screenings', 'Wellness Visits', 'Health Education', 'Lifestyle Guidance'],
    color: 'primary',
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-medical-blue-light via-background to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive healthcare services for children and families. From routine checkups to specialized care, 
              we're here for every stage of your child's health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="hover:shadow-lg transition-all hover:-translate-y-1 group overflow-hidden">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    service.color === 'secondary' 
                      ? 'bg-secondary/10 group-hover:bg-secondary/20' 
                      : 'bg-primary/10 group-hover:bg-primary/20'
                  }`}>
                    <service.icon className={`w-8 h-8 ${service.color === 'secondary' ? 'text-secondary' : 'text-primary'}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full ${service.color === 'secondary' ? 'bg-secondary' : 'bg-primary'}`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/appointments">
                    <Button variant="ghost" className={`p-0 h-auto font-semibold ${service.color === 'secondary' ? 'text-secondary hover:text-secondary/80' : 'text-primary hover:text-primary/80'}`}>
                      Book Appointment
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pediatric vs Fertility Section */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pediatric Services */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Baby className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Pediatric & Neonatal Care</h3>
                <p className="text-muted-foreground mb-6">
                  Led by Dr. Mohit Singhal, our pediatric department offers comprehensive care for children 
                  from birth through adolescence. With specialized training in neonatology and a fellowship 
                  from Boston, USA, Dr. Mohit provides world-class care for your little ones.
                </p>
                <ul className="space-y-2 mb-6">
                  {['General Pediatrics', 'Neonatal Care', 'Vaccinations', 'Growth Monitoring', 'Developmental Care'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/appointments">
                  <Button className="cta-button">
                    Book with Dr. Mohit
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Fertility Services */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-secondary" />
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Fertility Services</h3>
                <p className="text-muted-foreground mb-6">
                  Dr. Himanshu Singhal brings expertise in reproductive medicine and fertility treatments. 
                  With a compassionate approach and advanced techniques, she helps couples navigate their 
                  journey to parenthood with care and understanding.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Fertility Assessment', 'IVF Treatment', 'Infertility Management', 'Reproductive Counseling', 'Family Planning'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/appointments">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Book with Dr. Himanshu
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Choosing a Service?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Our team is here to guide you. Contact us to discuss your healthcare needs and we'll help 
            you find the right service for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointments">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Book Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
