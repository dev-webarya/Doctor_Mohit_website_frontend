import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { useAppData } from '@/store/AppDataContext';

const Appointments = () => {
  const { toast } = useToast();
  const { actions } = useAppData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || formData.name.length > 100) {
      toast({ title: 'Error', description: 'Please enter a valid name (max 100 characters)', variant: 'destructive' });
      return;
    }
    if (!formData.phone.trim() || !/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast({ title: 'Error', description: 'Please enter a valid phone number', variant: 'destructive' });
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }
    if (!formData.doctor) {
      toast({ title: 'Error', description: 'Please select a doctor', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    const doctorName =
      formData.doctor === 'dr-mohit' ? 'Dr. Mohit Singhal' : 'Dr. Himanshu Singhal';

    let patientId: string | undefined;
    if (formData.email) {
      const existing = actions.getPatientByEmail(formData.email);
      if (existing) {
        patientId = existing.id;
      }
    }

    if (!patientId) {
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';
      const created = actions.registerPatient({
        firstName,
        lastName,
        email: formData.email || `${Date.now()}@guest.local`,
        phone: formData.phone,
        motherName: '',
        fatherName: '',
        password: Math.random().toString(36).slice(2, 10),
      });
      patientId = created.id;
    }

    const timeSlot =
      formData.time === 'morning'
        ? '09:00'
        : formData.time === 'afternoon'
        ? '13:00'
        : formData.time === 'evening'
        ? '17:00'
        : '';

    if (formData.date && timeSlot) {
      actions.scheduleAppointment({
        patientId,
        doctorName,
        date: formData.date,
        time: timeSlot,
        reason: formData.reason,
      });
      // WhatsApp message is sent only after admin approves (see Admin Dashboard).
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: 'Appointment Request Submitted!',
      description: 'Your appointment has been added to our system.',
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <Helmet>
          <title>Appointment Submitted | Care & Cure Centre</title>
          <meta name="description" content="Your appointment request has been submitted successfully. We will contact you shortly to confirm." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <section className="section-padding bg-background min-h-[60vh] flex items-center">
          <div className="container mx-auto container-padding">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-medical-green/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-medical-green" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Appointment Request Submitted!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for choosing Care & Cure Centre. Your request has been sent to our admin for verification. 
                Once verified, your appointment with {formData.doctor === 'dr-mohit' ? 'Dr. Mohit Singhal' : 'Dr. Himanshu Singhal'} will be confirmed and visible in your dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                  Book Another Appointment
                </Button>
                <a href="tel:+919972899728">
                  <Button className="cta-button w-full sm:w-auto">
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Book Appointment | Care & Cure Centre - Bangalore</title>
        <meta name="description" content="Book your appointment with Dr. Mohit Singhal (Pediatrician) or Dr. Himanshu Singhal (Fertility Specialist) at Care & Cure Centre in Bangalore." />
        <meta name="keywords" content="book appointment, online booking, pediatrician appointment, fertility consultation" />
        <meta property="og:title" content="Book Appointment | Care & Cure Centre" />
        <meta property="og:description" content="Schedule your consultation with our expert doctors." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://careandcure.com/appointments" />
      </Helmet>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-medical-blue-light via-background to-background">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book an Appointment</h1>
            <p className="text-lg text-muted-foreground">
              Schedule your visit with our expert doctors. Choose your preferred method of booking below.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-12 bg-card border-y border-border/50">
        <div className="container mx-auto container-padding">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/919880928877?text=Hello! I would like to book an appointment at Care & Cure Centre."
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
                  <p className="text-sm text-muted-foreground">Quick & Easy</p>
                </CardContent>
              </Card>
            </a>

            {/* Phone */}
            <a href="tel:+919972899728" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+91 9972899728</p>
                </CardContent>
              </Card>
            </a>

            {/* Clinic Hours */}
            <Card className="h-full">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Clinic Hours</h3>
                <p className="text-sm text-muted-foreground">Mon-Sat: 9AM-8PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Online Appointment Form</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll contact you to confirm your appointment.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 9972899728"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor">Select Doctor *</Label>
                    <Select 
                      value={formData.doctor} 
                      onValueChange={(value) => setFormData({ ...formData, doctor: value })}
                    >
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Choose a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr-mohit">Dr. Mohit Singhal - Pediatrics & Neonatology</SelectItem>
                        <SelectItem value="dr-himanshu">Dr. Himanshu Singhal - Fertility Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select 
                        value={formData.time} 
                        onValueChange={(value) => setFormData({ ...formData, time: value })}
                      >
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                          <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit</Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe your concern or reason for the appointment..."
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      rows={4}
                      maxLength={1000}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full cta-button text-base" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Submit Appointment Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              By submitting this form, you agree to be contacted regarding your appointment request.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Appointments;
