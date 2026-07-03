import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp(form);
      navigate('/account');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container page-space narrow">
      <form className="glass-panel auth-form" onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <p>Register once and continue checkout securely.</p>
        {error ? <p className="notice error">{error}</p> : null}

        <label htmlFor="username">Username</label>
        <input id="username" value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />

        <div className="split-fields">
          <div>
            <label htmlFor="first_name">First name</label>
            <input id="first_name" value={form.first_name} onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))} required />
          </div>
          <div>
            <label htmlFor="last_name">Last name</label>
            <input id="last_name" value={form.last_name} onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))} required />
          </div>
        </div>

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required minLength={8} />

        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </section>
  );
}
