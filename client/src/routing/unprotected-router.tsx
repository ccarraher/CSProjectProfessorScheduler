import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/login-page"

export const UnprotectedRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    )
}