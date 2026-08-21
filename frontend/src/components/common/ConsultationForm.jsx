import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { leadsApi } from '../../api/endpoints';
import { SERVICE_OPTIONS } from '../../utils/constants';

const ConsultationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      await leadsApi.create(data);
      setSubmitted(true);
      toast.success('Your consultation request has been received.');
      reset();
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again or call us.';
      toast.error(message);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-nova-gold/40 bg-nova-card p-8 text-center">
        <h3 className="font-heading text-xl font-semibold text-nova-text">Thank you!</h3>
        <p className="mt-2 text-nova-text-secondary">
          We've received your consultation request. A member of our team will be in touch shortly.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-outline focus-ring mt-6">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-nova-text">
            Full Name <span className="text-nova-gold">*</span>
          </label>
          <input
            id="fullName"
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text placeholder:text-nova-text-secondary"
            placeholder="Your full name"
            {...register('fullName', { required: 'Full name is required' })}
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-nova-text">
            Phone Number <span className="text-nova-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text placeholder:text-nova-text-secondary"
            placeholder="613 000 0000"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-nova-text">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text placeholder:text-nova-text-secondary"
            placeholder="you@example.com"
            {...register('email', {
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-nova-text">
            Address / Area
          </label>
          <input
            id="address"
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text placeholder:text-nova-text-secondary"
            placeholder="e.g. Barrhaven, Ottawa"
            {...register('address')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-nova-text">
            Service Required <span className="text-nova-gold">*</span>
          </label>
          <select
            id="service"
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text"
            defaultValue=""
            {...register('service', { required: 'Please select a service' })}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-red-400">{errors.service.message}</p>}
        </div>

        <div>
          <label htmlFor="preferredContactMethod" className="mb-1.5 block text-sm font-medium text-nova-text">
            Preferred Contact Method
          </label>
          <select
            id="preferredContactMethod"
            className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text"
            defaultValue="Either"
            {...register('preferredContactMethod')}
          >
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="Either">Either</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="preferredContactTime" className="mb-1.5 block text-sm font-medium text-nova-text">
          Preferred Contact Time
        </label>
        <input
          id="preferredContactTime"
          className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text placeholder:text-nova-text-secondary"
          placeholder="e.g. Weekday mornings"
          {...register('preferredContactTime')}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-nova-text">
          Project Description
        </label>
        <textarea
          id="message"
          rows={4}
          className="focus-ring w-full rounded-lg border border-nova-border bg-nova-bg-secondary px-4 py-3 text-nova-text placeholder:text-nova-text-secondary"
          placeholder="Tell us about your project..."
          {...register('message')}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary focus-ring w-full justify-center disabled:opacity-60">
        {isSubmitting && <Loader2 size={18} className="animate-spin" />}
        {isSubmitting ? 'Submitting...' : 'Request Consultation'}
      </button>
    </form>
  );
};

export default ConsultationForm;
