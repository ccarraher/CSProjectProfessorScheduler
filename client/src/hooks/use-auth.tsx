import { SubmitHandler } from 'react-hook-form';
import * as React from 'react'
import { LoginFormInputs } from '../pages/login-page';


export const useAuth = () => {
    const [user, setUser] = React.useState<User>()
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    const handleUserData = (data: User[]) => {
        if (data) {
            setUser(data[0])
        }
    }

    const login: SubmitHandler<LoginFormInputs> = (userCreds: LoginFormInputs) => {
        console.log(userCreds)
        setIsAuthenticated(true)
    }

    const logout = (): void => {
        setIsAuthenticated(false)
    }

    React.useEffect(() => {
        // API call to current user here?
        fetch('https://jsonplaceholder.typicode.com/users?id=1')
            .then(res => res.json())
            .then(json => handleUserData(json))
    }, [])

    return { isAuthenticated, user, login, logout }
}

export const AuthContext = React.createContext(null as unknown as AuthenticatedUserContextValue)

export const AuthProvider = ({children}: AuthenticatedUserProviderProps): JSX.Element => {
    const { login, isAuthenticated, user, logout } = useAuth()

    const value: AuthenticatedUserContextValue = {
        login,
        isAuthenticated,
        user,
        logout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

interface User {
    readonly id: number
    readonly name: string
    readonly username: string
    readonly email: string
    readonly address: Address
    readonly phone: string
    readonly company: Company 
}

interface Address {
    readonly street: string
    readonly suite: string
    readonly city: string
    readonly zipCode: string
    readonly geo: Pick<GeolocationCoordinates, 'latitude' |  'longitude'>
}

interface Company {
    readonly name: string
    readonly catchPhrase: string
    readonly bs: string
}

export interface AuthenticatedUserContextValue {
    readonly login: SubmitHandler<LoginFormInputs>
    readonly logout: () => void
    readonly isAuthenticated: boolean
    readonly user: User | undefined
}

interface AuthenticatedUserProviderProps extends React.HTMLAttributes<HTMLElement> {}