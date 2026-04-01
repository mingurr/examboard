import { Routes, Route, Navigate } from "react-router";
import LoginPage from "@/pages/LoginPage";
import SearchPage from "@/pages/SearchPage";
import ArchivePage from "@/pages/ArchivePage";
import MaterialsPage from "@/pages/MaterialsPage";
import SettingsPage from "@/pages/SettingsPage";
import MainLayout from "../layout/MainLayout";
import AnalysisPage from "@/pages/AnalysisPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
