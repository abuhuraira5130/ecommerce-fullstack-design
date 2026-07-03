import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="app-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
