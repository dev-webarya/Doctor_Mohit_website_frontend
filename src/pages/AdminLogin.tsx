import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ADMIN_EMAIL = 'admin@carecure.com';
const ADMIN_PASSWORD = 'admin123';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('carecure-admin-auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Login | Care and Cure</title>
        <meta name="description" content="Administrator login for Care and Cure." />
      </Helmet>
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding max-w-md space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            Use your admin credentials to manage employees, patients and appointments.
          </p>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-xs text-amber-700">
              <strong>Demo Credentials:</strong><br/>
              Email: <strong>admin@carecure.com</strong><br/>
              Password: <strong>admin123</strong>
            </p>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@carecure.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
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

export default AdminLogin;
