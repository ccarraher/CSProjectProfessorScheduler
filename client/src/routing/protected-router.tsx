import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/home-page"
import { BaseLayout } from "../components/base-layout"

export const ProtectedRouter = () => {
    return (
        <BaseLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BaseLayout>
    )
}