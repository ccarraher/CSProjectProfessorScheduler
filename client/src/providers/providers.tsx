import {RouterProvider} from 'react-router-dom'
import { Router } from '../routing/router'

export const Providers = () => {
    return (
        <RouterProvider router={Router} />
    )
}