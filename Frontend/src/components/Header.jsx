import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <header className="site-header glass-panel">
      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-badge">SP</span>
          <span className="brand-text">Storefront Pro</span>
        </Link>

        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          {isAuthenticated ? <NavLink to="/account">Account</NavLink> : null}
        </nav>

        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <span className="user-chip">{user?.first_name || user?.username}</span>
              <button type="button" className="btn btn-muted" onClick={signOut}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-muted" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary" to="/register">
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
