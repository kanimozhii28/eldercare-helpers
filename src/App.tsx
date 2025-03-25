
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Caregivers from "./pages/Caregivers";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import CaregiverBooking from "./pages/CaregiverBooking";
import LiveTracking from "./pages/LiveTracking";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/caregivers" element={<Caregivers />} />
          <Route path="/caregivers/booking/:caregiverId" element={<CaregiverBooking />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/live-tracking" element={<LiveTracking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
