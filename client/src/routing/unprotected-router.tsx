import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/login-page"
import { RegisterPage } from "../pages/register-page"
import { JSX } from "react/jsx-runtime"
import { HomePage } from "../pages/home-page"



export const UnprotectedRouter = () => {
    return (
        <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path="*" element={<Navigate to={"login"} />} />
            <Route path='register' element={<RegisterPage onFormSwitch={function (arg0: (props: any) => JSX.Element): void {
                throw new Error("Function not implemented.")
                } } />} />
        </Routes>
    )
}