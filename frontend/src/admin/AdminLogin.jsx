import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  if (isAuthenticated) {
    navigate('/admin', { replace: true });
  }

  const onSubmit = async (data) => {
    setError('');
    try {
      await login(data.email, data.password);
      toast.success('Welcome back');
      navigate('/admin');
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password';
      setError(message);
    }
  };

  return (
    <>
      <SEO title="Admin Login | Nova Hardscapes" description="Nova Hardscapes admin portal login." />
      <div className="flex min-h-screen items-center justify-center bg-nova-bg px-4">
        <div className="w-full max-w-sm rounded-xl border border-nova-border bg-nova-card p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-nova-gold/40 bg-nova-bg">
              <Lock size={20} className="text-nova-gold" />
            </div>
            <h1 className="mt-4 font-heading text-xl font-bold text-nova-text">Nova Admin Portal</h1>
            <p className="mt-1 text-sm text-nova-text-secondary">Sign in to manage your site</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-nova-text">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-2.5 text-nova-text"
                {...register('email', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-nova-text">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-2.5 text-nova-text"
                {...register('password', { required: true })}
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary focus-ring w-full justify-center disabled:opacity-60">
              {isSubmitting && <Loader2 size={18} className="animate-spin" />}
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
