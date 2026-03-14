import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppData } from '@/store/AppDataContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const PatientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { actions } = useAppData();
  const navigate = useNavigate();

  const login = () => {
    const p = actions.validatePatientLogin(email, password);
    if (p) {
      navigate(`/patient/${p.id}`);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Patient Login | Care and Cure</title>
        <meta name="description" content="Patient login for appointments and records at Care and Cure." />
      </Helmet>
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Patient Login</h1>
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-xs text-blue-700">
              <strong>Demo Credentials:</strong><br/>
              Email: <strong>test_patient1@example.com</strong> | Password: <strong>password123</strong><br/>
              Email: <strong>test_patient2@example.com</strong> | Password: <strong>password123</strong>
            </p>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-email">Email</Label>
                <Input 
                  id="patient-email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-password">Password</Label>
                <div className="relative">
                  <Input
                    id="patient-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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
              <Button className="w-full" onClick={login}>Login</Button>
              <p className="text-sm text-muted-foreground text-center">
                New patient? <Link to="/register/patient" className="text-primary underline">Register</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default PatientLogin;
