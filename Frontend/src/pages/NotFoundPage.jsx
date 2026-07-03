import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="container page-space narrow">
      <div className="glass-panel auth-form">
        <h1>404</h1>
        <p>Page not found.</p>
        <Link className="btn btn-primary" to="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
