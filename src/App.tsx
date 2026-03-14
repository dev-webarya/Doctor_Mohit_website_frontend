import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AppDataProvider } from "./store/AppDataContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import PatientRegister from "./pages/PatientRegister";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppDataProvider>
        <Helmet>
          <title>Care and Cure Fertility Centre | Pediatrics, Neonatology & Fertility Clinic in Bangalore</title>
          <meta name="description" content="Care and Cure Fertility Centre offers expert pediatric, neonatal, and fertility care in Bangalore. Dr. Mohit Singhal (Pediatrician) and Dr. Himanshu Singhal (Fertility Specialist). Book your appointment today!" />
          <meta name="keywords" content="pediatrician bangalore, neonatologist, fertility specialist, child care, baby doctor, vaccination, IVF, infertility treatment, koramangala" />
          <meta property="og:title" content="Care and Cure Fertility Centre | Pediatrics & Fertility Clinic Bangalore" />
          <meta property="og:description" content="Expert pediatric, neonatal, and fertility care. Trusted by 100,000+ families in Bangalore." />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_IN" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://careandcure.com" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Care and Cure Fertility Centre",
              "description": "Pediatric, Neonatal, and Fertility Clinic in Bangalore",
              "url": "https://careandcure.com",
              "telephone": "+919876543210",
              "email": "info@careandcure.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Healthcare Avenue, Koramangala",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560034",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "12.934533",
                "longitude": "77.614268"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "20:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "10:00",
                  "closes": "14:00"
                }
              ],
              "medicalSpecialty": ["Pediatrics", "Neonatology", "Reproductive Medicine"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Medical Services",
                "itemListElement": [
                  {"@type": "Offer", "itemOffered": {"@type": "MedicalService", "name": "Pediatric Consultation"}},
                  {"@type": "Offer", "itemOffered": {"@type": "MedicalService", "name": "Neonatal Care"}},
                  {"@type": "Offer", "itemOffered": {"@type": "MedicalService", "name": "Vaccinations"}},
                  {"@type": "Offer", "itemOffered": {"@type": "MedicalService", "name": "Fertility Treatment"}}
                ]
              }
            })}
          </script>
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/doctor" element={<DoctorLogin />} />
            <Route path="/login/patient" element={<PatientLogin />} />
            <Route path="/register/patient" element={<PatientRegister />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/patient/:id" element={<PatientDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AppDataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
