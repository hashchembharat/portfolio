import AppRoutes from "./routes";
import HeaderNavbar from "./components/common/layout/Header/Header";
import Footer from "./components/common/layout/Footer/Footer";
import RoutePersister from "./components/common/RoutePersister";
// import SocialNavbar from "./components/common/layout/socialNav/SocialNavbar";

function App() {
  return (
    <div className="app">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white"
      >
        Skip to main content
      </a>
      <HeaderNavbar />
      <main id="main-content">
        <RoutePersister />
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
