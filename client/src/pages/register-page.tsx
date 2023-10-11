import axios from 'axios';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { RhfTextField } from '../components/rhf-text-field'
import { RegisterFormFieldNames, RegisterFormSchema } from '../forms/login/register-form'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { theme } from '../theme/theme'
import { Paper, Typography } from '@mui/material'
import {Link} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export const RegisterPage = () => {
    const navigate = useNavigate()
    const register: SubmitHandler<RegisterFormInputs> = (userCreds: RegisterFormInputs) => {
        axios.post('http://localhost:8080/register', {
            username: userCreds.username,
            password: userCreds.password,
            firstName: userCreds.firstname,
            lastName: userCreds.lastname
        })  
        { navigate('/login') }
    }
    const defaultValues = {first: '', last: '', username: '', password: '', password2: ''}
    const methods = useForm<RegisterFormInputs>({mode: 'onBlur', resolver: zodResolver(RegisterFormSchema), defaultValues: defaultValues})
    const { handleSubmit } = methods

    return (
        <Box sx={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Paper sx={{width: '500px', padding: '32px'}}>
                <FormProvider {...methods}>
                    <Box onSubmit={handleSubmit(register)} component="form" sx={{display: 'flex', flexDirection: 'column', gap: theme.spacing(4)}}>
                        <Typography sx={{textAlign: 'center'}} variant="h3">Sign Up</Typography>
                        <RhfTextField name={RegisterFormFieldNames.first} label="First Name" muiProps={{required: true}} />
                        <RhfTextField name={RegisterFormFieldNames.last} label="Last Name" muiProps={{required: true}} />
                        <RhfTextField name={RegisterFormFieldNames.username} label="Username" muiProps={{required: true}} />
                        <RhfTextField name={RegisterFormFieldNames.password} label="Password" muiProps={{required: true, type: 'password'}} />
                        <RhfTextField name={RegisterFormFieldNames.password2} label="Confirm Password" muiProps={{required: true, type: 'password'}} />
                        <Button onClick={handleSubmit(register)} variant="contained">Sign Up</Button>
                    </Box>
                </FormProvider>
                <Typography align='center'>
                <Link component={RouterLink} to='/login'>Already have an account? Log-in here.</Link>
                </Typography>
            </Paper>
        </Box>
    )
}


export interface RegisterFormInputs {
    readonly firstname: string
    readonly lastname: string
    readonly username: string
    readonly password: string
    readonly password2: string
}