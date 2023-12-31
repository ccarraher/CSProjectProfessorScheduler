import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { RhfTextField } from '../components/rhf-text-field'
import { LoginFormFieldNames, LoginFormSchema } from '../forms/login/login-form'
import { theme } from '../theme/theme'
import { Paper, Typography, Box, Link, Button } from '@mui/material'
import { AuthContext } from '../hooks/use-auth'
import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom'



export const LoginPage = () => {
    const { login } = React.useContext(AuthContext)
    const defaultValues = {username: '', password: ''}
    const methods = useForm<LoginFormInputs>({mode: 'onBlur', resolver: zodResolver(LoginFormSchema), defaultValues: defaultValues})
    const { handleSubmit } = methods
    return (
        <Box sx={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Paper sx={{width: '500px', padding: '32px'}}>
                <FormProvider {...methods}>
                    <Box onSubmit={handleSubmit(login)} component="form" sx={{display: 'flex', flexDirection: 'column', gap: theme.spacing(4)}}>
                        <Typography sx={{textAlign: 'center'}} variant="h3">Login</Typography>
                        <RhfTextField name={LoginFormFieldNames.username} label="Username" muiProps={{required: true}} />
                        <RhfTextField name={LoginFormFieldNames.password} label="Password" muiProps={{required: true, type: 'password'}} />
                        <Button onClick={handleSubmit(login)} variant="contained">Login</Button>
                    </Box>
                    <Typography align='center'>
                    <Link component={RouterLink} to='/register'>Don't have an account? Sign up here.</Link>
                    </Typography>
                </FormProvider>
            </Paper>
        </Box>
    )
}

export interface LoginFormInputs {
    readonly username: string
    readonly password: string
}