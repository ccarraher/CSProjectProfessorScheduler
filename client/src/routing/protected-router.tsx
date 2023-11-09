import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/home-page"
import { AvailabilityPage } from "../pages/availability-page"
import { BaseLayout } from "../components/base-layout"
import { CourseSelectionPage } from "../pages/course-selection-page"

export const ProtectedRouter = () => {
    return (
        <BaseLayout>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/availability" element={<AvailabilityPage />} />
                <Route path="/preference" element={<CourseSelectionPage />} />

            </Routes>
        </BaseLayout>
    )
}