import React, { lazy, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ... (Imports Animation & Assets) ...
import { AnimatePresence } from "framer-motion";
import ScreenProtection from "./components/ScreenProtection";

// ... (Helper Lazy Load) ...
const lazyLoad = (importPromise: Promise<any>) => lazy(() => importPromise);

// ---------------------------------------------------------------------
// 📦 LAZY LOADING COMPONENTS
// ---------------------------------------------------------------------
const Layout = lazyLoad(import("./components/Layout"));
const Login = lazyLoad(import("./pages/Login"));
const Onboarding = lazyLoad(import("./pages/Onboarding"));
const Home = lazyLoad(import("./pages/Home"));

// Students & Teachers
const Students = lazyLoad(import("./pages/Students"));
const Teachers = lazyLoad(import("./pages/Teachers"));
const StudentDetail = lazyLoad(import("./pages/StudentDetail"));
const TeacherDetail = lazyLoad(import("./pages/TeacherDetail"));
const StudentForm = lazyLoad(import("./components/Student/StudentForm"));
const TeacherForm = lazyLoad(import("./components/Teacher/TeacherForm"));

// 👇 Team Pages
const TeamPage = lazyLoad(import("./pages/TeamPage"));
const TeamMemberDetail = lazyLoad(import("./pages/TeamMemberDetail"));

// Tools & Calculators
const HitungPage = lazyLoad(import("./pages/HitungPage"));
const DigitalFalak = lazyLoad(import("./pages/DigitalFalak"));
const KalkulatorZakat = lazyLoad(import("./pages/Zakat"));
const KalkulatorWaris = lazyLoad(import("./pages/Waris"));

// Others
const Istigosah = lazyLoad(import("./pages/Kitab/Istigosah"));
const PdfViewer = lazyLoad(import("./pages/Kitab/PdfViewer"));
const CalendarPage = lazyLoad(import("./pages/CalendarPage")); 

const StorePage = lazyLoad(import("./pages/Store/StorePage"));
const CartPage = lazyLoad(import("./pages/Store/CartPage"));
const ProductDetail = lazyLoad(import("./pages/Store/ProductDetail"));
const ArticlePage = lazyLoad(import("./pages/Artikel/ArticlePage"));
const FullGallery = lazyLoad(import("./pages/FullGallery"));

// ---------------------------------------------------------------------
// ⬆️ SCROLL TO TOP COMPONENT
// ---------------------------------------------------------------------
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// ---------------------------------------------------------------------
// ⚡ SIMPLE LOADER (Pengganti Splash Screen Berat)
// ---------------------------------------------------------------------
// Ini cuma muncul sebentar banget pas pindah halaman, ringan pol.
const SimpleLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
  </div>
);

// ---------------------------------------------------------------------
// 🔄 APP ROUTES & LOGIC
// ---------------------------------------------------------------------
const AppRoutes: React.FC = () => {
  const { user } = useAuth(); // Langsung ambil user, gak pake loading state buatan
  const location = useLocation();
  const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding") === "true";

  // LOGIC SIMPLE: Kalau gak ada user, arahin ke Login/Onboarding
  if (!user) {
    return (
      <Suspense fallback={<SimpleLoader />}>
        <Routes>
          <Route path="/onboarding" element={hasSeenOnboarding ? <Navigate to="/login" replace /> : <Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to={hasSeenOnboarding ? "/login" : "/onboarding"} replace />} />
        </Routes>
      </Suspense>
    );
  }

  // Kalau ada user, masuk ke Layout Utama
  return (
    <AnimatePresence mode="wait">
      {/* Fallback di sini cuma buat nunggu file JS ke-download (lazy load), bukan timer buatan */}
      <Suspense fallback={<SimpleLoader />}>
        <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/onboarding" element={<Navigate to="/" replace />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              {/* FEATURES */}
              <Route path="students" element={<Students />} />
              <Route path="students/:id" element={<StudentDetail />} />
              <Route path="students/add" element={<ProtectedRoute adminOnly><StudentForm /></ProtectedRoute>} />
              <Route path="students/edit/:id" element={<ProtectedRoute adminOnly><StudentForm isEdit /></ProtectedRoute>} />

              <Route path="teachers" element={<Teachers />} />
              <Route path="teachers/:id" element={<TeacherDetail />} />
              <Route path="teachers/add" element={<ProtectedRoute adminOnly><TeacherForm /></ProtectedRoute>} />
              <Route path="teachers/edit/:id" element={<ProtectedRoute adminOnly><TeacherForm isEdit /></ProtectedRoute>} />

              {/* Team Routes */}
              <Route path="team" element={<TeamPage />} />
              <Route path="team/:id" element={<TeamMemberDetail />} />

              {/* TOOLS */}
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="tools" element={<HitungPage />} />
              <Route path="falak" element={<DigitalFalak />} />
              <Route path="zakat" element={<KalkulatorZakat />} />
              <Route path="waris" element={<KalkulatorWaris />} />
              <Route path="istigosah" element={<Istigosah />} />
              <Route path="pdf-viewer" element={<PdfViewer />} />

              {/* STORE */}
              <Route path="store" element={<StorePage />} />
              <Route path="store/:id" element={<ProductDetail />} />
              <Route path="cart" element={<CartPage />} />

              {/* OTHERS */}
              <Route path="article/:articleId" element={<ArticlePage />} />
              <Route path="koleksi-lengkap" element={<FullGallery />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

// ---------------------------------------------------------------------
// ✔ APP ROOT
// ---------------------------------------------------------------------
const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScreenProtection /> 
          <ScrollToTop /> 
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;