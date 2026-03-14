import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Syringe, FileText, HelpCircle, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';

const faqs = [
  {
    question: 'What age group does Dr. Mohit Singhal treat?',
    answer: 'Dr. Mohit Singhal treats children from newborns through adolescence (0-18 years). He has specialized training in neonatology for newborn care and is experienced in handling all pediatric health concerns.',
  },
  {
    question: 'Do I need an appointment for vaccinations?',
    answer: 'While walk-ins are welcome for vaccinations, we recommend scheduling an appointment to minimize wait times. You can book through our website, WhatsApp, or by calling our clinic directly.',
  },
  {
    question: 'What should I bring for my child\'s first visit?',
    answer: 'Please bring any previous medical records, vaccination history, current medications list, and your child\'s health insurance card if applicable. For newborns, bring the birth certificate and hospital discharge summary.',
  },
  {
    question: 'How do I know if my child needs to see a neonatologist vs a pediatrician?',
    answer: 'Neonatal care is typically for newborns (first 28 days) and premature babies. Dr. Mohit Singhal handles both general pediatric care and specialized neonatal cases. Our team will guide you to the appropriate care based on your child\'s needs.',
  },
  {
    question: 'What fertility treatments does Dr. Himanshu Singhal offer?',
    answer: 'Dr. Himanshu Singhal offers comprehensive fertility services including fertility assessments, IVF treatment, infertility management, reproductive counseling, and family planning support. An initial consultation will help determine the best treatment approach for you.',
  },
  {
    question: 'Is the clinic open on weekends?',
    answer: 'Yes, we are open on Saturdays (9:00 AM - 8:00 PM) and Sundays (10:00 AM - 2:00 PM) with limited hours. For emergencies, please call our emergency line.',
  },
  {
    question: 'Do you accept health insurance?',
    answer: 'Yes, we accept most major health insurance providers. Please contact our front desk or check with your insurance provider for coverage details. We also offer self-pay options with transparent pricing.',
  },
  {
    question: 'How can I get my child\'s vaccination records?',
    answer: 'You can request vaccination records by contacting our front desk. We maintain digital records of all immunizations administered at our clinic and can provide printed copies or digital records as needed.',
  },
];

const vaccinationSchedule = [
  { age: 'Birth', vaccines: ['BCG', 'OPV-0', 'Hepatitis B-1'] },
  { age: '6 Weeks', vaccines: ['DTwP/DTaP-1', 'IPV-1', 'Hib-1', 'Hepatitis B-2', 'Rotavirus-1', 'PCV-1'] },
  { age: '10 Weeks', vaccines: ['DTwP/DTaP-2', 'IPV-2', 'Hib-2', 'Rotavirus-2', 'PCV-2'] },
  { age: '14 Weeks', vaccines: ['DTwP/DTaP-3', 'IPV-3', 'Hib-3', 'Rotavirus-3', 'PCV-3'] },
  { age: '6 Months', vaccines: ['Hepatitis B-3', 'OPV-1', 'Influenza-1'] },
  { age: '9 Months', vaccines: ['MMR-1', 'Typhoid Conjugate'] },
  { age: '12 Months', vaccines: ['Hepatitis A-1', 'PCV Booster'] },
  { age: '15 Months', vaccines: ['MMR-2', 'Varicella-1'] },
  { age: '16-18 Months', vaccines: ['DTwP/DTaP Booster-1', 'IPV Booster', 'Hib Booster'] },
  { age: '18 Months', vaccines: ['Hepatitis A-2'] },
  { age: '4-6 Years', vaccines: ['DTwP/DTaP Booster-2', 'OPV Booster', 'Varicella-2', 'MMR-3 (if needed)'] },
  { age: '10-12 Years', vaccines: ['Tdap', 'HPV (2-3 doses)'] },
];

const Resources = () => {
  return (
    <Layout>
      <Helmet>
        <title>Resources & FAQs | Care and Cure Fertility Centre - Parenting & Health Tips</title>
        <meta name="description" content="Access vaccination schedules, FAQs, health tips for parents, and downloadable resources at Care and Cure Fertility Centre." />
        <meta name="keywords" content="FAQs, vaccination schedule, health tips, parenting advice, resources, vaccination chart" />
        <meta property="og:title" content="Resources & FAQs | Care and Cure Fertility Centre" />
        <meta property="og:description" content="Expert resources and advice for child health and parenting." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://careandcure.com/resources" />
      </Helmet>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-medical-blue-light via-background to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Patient Resources</h1>
            <p className="text-lg text-muted-foreground">
              Helpful information, FAQs, vaccination schedules, and resources for parents and families.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container mx-auto container-padding">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HelpCircle, title: 'FAQs', description: 'Common questions answered', href: '#faqs' },
              { icon: Syringe, title: 'Vaccination Schedule', description: 'Immunization timeline', href: '#vaccines' },
              { icon: FileText, title: 'Health Tips', description: 'Expert advice for parents', href: '#tips' },
              { icon: Download, title: 'Downloads', description: 'Forms and brochures', href: '#downloads' },
            ].map((item) => (
              <a key={item.title} href={item.href}>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="section-padding bg-background scroll-mt-20">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our services and care.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Vaccination Schedule */}
      <section id="vaccines" className="section-padding bg-muted/50 scroll-mt-20">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Vaccination Schedule</h2>
              <p className="text-muted-foreground">
                Recommended immunization schedule for children (as per Indian Academy of Pediatrics).
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-semibold">Age</th>
                        <th className="text-left p-4 font-semibold">Vaccines</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vaccinationSchedule.map((row, index) => (
                        <tr key={index} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-4 font-medium whitespace-nowrap">{row.age}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                              {row.vaccines.map((vaccine) => (
                                <span key={vaccine} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                  {vaccine}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              * This is a general guideline. Your doctor may recommend additional vaccines based on individual needs.
            </p>
          </div>
        </div>
      </section>

      {/* Health Tips */}
      <section id="tips" className="section-padding bg-background scroll-mt-20">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Health Tips for Parents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert advice from our doctors to help you keep your children healthy and happy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Nutrition Basics',
                tips: ['Encourage fruits and vegetables at every meal', 'Limit sugary drinks and processed foods', 'Ensure adequate calcium and vitamin D', 'Make mealtime a family activity'],
              },
              {
                title: 'Sleep Hygiene',
                tips: ['Establish a consistent bedtime routine', 'Limit screen time before bed', 'Keep the bedroom cool and dark', 'Ensure age-appropriate sleep duration'],
              },
              {
                title: 'Physical Activity',
                tips: ['Aim for 60 minutes of active play daily', 'Limit sedentary screen time', 'Encourage outdoor activities', 'Make exercise fun with games and sports'],
              },
              {
                title: 'Illness Prevention',
                tips: ['Teach proper handwashing technique', 'Keep vaccinations up to date', 'Ensure good ventilation at home', 'Stay home when sick to prevent spread'],
              },
              {
                title: 'Mental Health',
                tips: ['Create open communication channels', 'Validate your child\'s feelings', 'Watch for behavioral changes', 'Encourage healthy friendships'],
              },
              {
                title: 'Safety First',
                tips: ['Childproof your home', 'Use age-appropriate car seats', 'Teach stranger safety', 'Keep emergency numbers accessible'],
              },
            ].map((section) => (
              <Card key={section.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="section-padding bg-muted/50 scroll-mt-20">
        <div className="container mx-auto container-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Downloadable Resources</h2>
            <p className="text-muted-foreground mb-8">
              Forms and brochures to help you prepare for your visit.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'New Patient Registration Form', type: 'PDF' },
                { title: 'Vaccination Record Card', type: 'PDF' },
                { title: 'Growth Chart Template', type: 'PDF' },
                { title: 'Clinic Brochure', type: 'PDF' },
              ].map((doc) => (
                <Card key={doc.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium">{doc.title}</h4>
                      <p className="text-sm text-muted-foreground">{doc.type}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              * Downloads coming soon. Contact our clinic for any forms you need.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Have More Questions?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Our team is happy to help. Contact us or book a consultation with our doctors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/appointments">
              <Button size="lg" variant="secondary">
                <Calendar className="w-5 h-5" />
                Book Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
