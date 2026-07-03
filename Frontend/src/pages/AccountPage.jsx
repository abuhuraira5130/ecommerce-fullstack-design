import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AccountPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="container page-space narrow">
        <div className="glass-panel auth-form">
          <h1>Account</h1>
          <p>You are not signed in.</p>
          <Link className="btn btn-primary" to="/login">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container page-space narrow">
      <div className="glass-panel account-card">
        <h1>Hi, {user.first_name || user.username}</h1>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Name: {user.first_name} {user.last_name}</p>
      </div>
    </section>
  );
}
