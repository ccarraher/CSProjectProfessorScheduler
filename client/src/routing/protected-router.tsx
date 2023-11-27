import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home-page";
import { AvailabilityPage } from "../pages/availability-page";
import { BaseLayout } from "../components/base-layout";
import { CourseSelectionPage } from "../pages/course-selection-page";
import { AuthContext } from "../hooks/use-auth";
import { AdminHomePage } from "../pages/admin-home-page";

export const ProtectedRouter = () => {
  const { user } = React.useContext(AuthContext);
  const isAdmin = user?.role.roleId === 1;

  if (isAdmin) {
    return (
      <BaseLayout isAdmin={true}>
        <Routes>
          <Route path="/home" element={<AdminHomePage />} />
        </Routes>
      </BaseLayout>
    );
  }
  return (
    <BaseLayout>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/preference" element={<CourseSelectionPage />} />
      </Routes>
    </BaseLayout>
  );
};
