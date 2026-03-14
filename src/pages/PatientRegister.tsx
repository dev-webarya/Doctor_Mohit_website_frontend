import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useAppData } from '@/store/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PatientRegister = () => {
  const { actions } = useAppData();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    motherName: "",
    fatherName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) return;
    const p = actions.registerPatient({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      motherName: form.motherName,
      fatherName: form.fatherName,
    });
    navigate(`/patient/${p.id}`);
  };

  return (
    <Layout>
      <Helmet>
        <title>New Patient Registration | Care and Cure</title>
        <meta name="description" content="Create your patient account to manage appointments at Care and Cure." />
      </Helmet>
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">New Patient Registration</h1>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile</Label>
                <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mother-name">Mother's Name</Label>
                  <Input id="mother-name" placeholder="Mother's full name" value={form.motherName} onChange={(e) => setForm({ ...form, motherName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father-name">Father's Name</Label>
                  <Input id="father-name" placeholder="Father's full name" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={submit}>Create Account</Button>
              <p className="text-sm text-muted-foreground text-center">
                Already have an account? <Link to="/login/patient" className="text-primary underline">Login</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default PatientRegister;
