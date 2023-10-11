import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/login-page"
import { RegisterPage } from "../pages/register-page"



export const UnprotectedRouter = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    )
}