import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(form.username, form.password);
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
        <h1>Welcome back</h1>
        <p>Sign in to continue your checkout and order history flow.</p>
        {error ? <p className="notice error">{error}</p> : null}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={form.username}
          onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          required
        />

        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <p>
          New here? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
}
