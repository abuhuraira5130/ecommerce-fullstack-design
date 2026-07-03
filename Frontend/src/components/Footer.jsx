export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">Storefront Pro</p>
          <p className="footer-copy">Performance-ready ecommerce UI wired to your Django and Neon backend.</p>
        </div>
        <div>
          <p className="footer-title">Deployment</p>
          <p className="footer-copy">Frontend: Vercel or Netlify</p>
          <p className="footer-copy">Backend: Render + Neon PostgreSQL</p>
        </div>
      </div>
    </footer>
  );
}
