import { AuthContext } from "../hooks/use-auth"
import { ProtectedRouter } from "./protected-router"
import {UnprotectedRouter} from "./unprotected-router"
import * as React from 'react'

export const BaseRouter = (): JSX.Element => {
    const {isAuthenticated} = React.useContext(AuthContext)
    
    return isAuthenticated ? <ProtectedRouter /> : <UnprotectedRouter />
}