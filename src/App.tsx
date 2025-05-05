
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Caregivers from "./pages/Caregivers";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import CaregiverBooking from "./pages/CaregiverBooking";
import CaregiverProfile from "./pages/CaregiverProfile";
import LiveTracking from "./pages/LiveTracking";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import ReviewBooking from "./pages/ReviewBooking";
import Profile from "./pages/Profile";
import CarePlans from "./pages/CarePlans";
import VoiceAssistant from "./components/VoiceAssistant";
import SOSButton from "./components/SOSButton";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    // Redirect to login but save the route they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Main App with authentication wrapped routes
const AppWithAuth = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/services/:serviceId" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
        <Route path="/caregivers" element={<ProtectedRoute><Caregivers /></ProtectedRoute>} />
        <Route path="/caregivers/:caregiverId" element={<ProtectedRoute><CaregiverProfile /></ProtectedRoute>} />
        <Route path="/caregivers/booking/:caregiverId" element={<ProtectedRoute><CaregiverBooking /></ProtectedRoute>} />
        <Route path="/how-it-works" element={<ProtectedRoute><HowItWorks /></ProtectedRoute>} />
        <Route path="/live-tracking" element={<ProtectedRoute><LiveTracking /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/review-booking" element={<ProtectedRoute><ReviewBooking /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/care-plans" element={<ProtectedRoute><CarePlans /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SOSButton />
      <VoiceAssistant />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppWithAuth />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
