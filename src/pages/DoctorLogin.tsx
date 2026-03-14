import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type DoctorAccount = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const DOCTORS: DoctorAccount[] = [
  {
    id: 'dr-mohit',
    name: 'Dr. Mohit Singhal',
    email: 'mohit@carecure.com',
    password: 'mohit123',
  },
  {
    id: 'dr-himanshu',
    name: 'Dr. Himanshu Singhal',
    email: 'himanshu@carecure.com',
    password: 'himanshu123',
  },
];

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    const doctor = DOCTORS.find((d) => d.email === email && d.password === password);
    if (doctor) {
      localStorage.setItem(
        'carecure-current-doctor',
        JSON.stringify({ id: doctor.id, name: doctor.name }),
      );
      navigate('/doctor');
    } else {
      setError('Invalid doctor credentials');
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Doctor Login | Care and Cure</title>
        <meta name="description" content="Doctor portal login for Care and Cure." />
      </Helmet>
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding max-w-md space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Doctor Login</h1>
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-xs text-green-700">
              <strong>Demo Credentials:</strong><br/>
              Dr. Mohit: <strong>mohit@carecure.com</strong> / <strong>mohit123</strong><br/>
              Dr. Himanshu: <strong>himanshu@carecure.com</strong> / <strong>himanshu123</strong>
            </p>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Use the credentials for Dr. Mohit or Dr. Himanshu to access the doctor dashboard.
              </p>
              <div className="space-y-2">
                <Label htmlFor="doctor-email">Email</Label>
                <Input
                  id="doctor-email"
                  type="email"
                  placeholder="mohit@carecure.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor-password">Password</Label>
                <div className="relative">
                  <Input
                    id="doctor-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
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
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button className="w-full" onClick={login}>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default DoctorLogin;
