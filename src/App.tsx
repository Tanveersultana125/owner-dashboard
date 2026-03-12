import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import StudentsIntelligence from "@/pages/StudentsIntelligence";
import TeacherPerformance from "@/pages/TeacherPerformance";
import TeacherProfile from "@/pages/TeacherProfile";
import AcademicsOverview from "@/pages/AcademicsOverview";
import FinanceFees from "@/pages/FinanceFees";
import RisksAlerts from "@/pages/RisksAlerts";
import AlertDetail from "@/pages/AlertDetail";
import BranchesComparison from "@/pages/BranchesComparison";
import ReportsCenter from "@/pages/ReportsCenter";
import SettingsPage from "@/pages/SettingsPage";
import PrincipalManagement from "@/pages/PrincipalManagement";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsIntelligence />} />
            <Route path="/students/:id" element={<StudentsIntelligence />} />
            <Route path="/teachers" element={<TeacherPerformance />} />
            <Route path="/teachers/:id" element={<TeacherPerformance />} />
            <Route path="/teachers/profile" element={<TeacherProfile />} />
            <Route path="/academics" element={<AcademicsOverview />} />
            <Route path="/academics/:id" element={<AcademicsOverview />} />
            <Route path="/finance" element={<FinanceFees />} />
            <Route path="/risks" element={<RisksAlerts />} />
            <Route path="/risks/:id" element={<AlertDetail />} />
            <Route path="/branches" element={<BranchesComparison />} />
            <Route path="/branches/:id" element={<BranchesComparison />} />
            <Route path="/reports" element={<ReportsCenter />} />
            <Route path="/principals" element={<PrincipalManagement />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
