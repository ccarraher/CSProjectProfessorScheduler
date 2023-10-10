import {z} from 'zod'

export const RegisterFormSchema = z.object({
    first: z.string({ required_error: 'First name is required'}).regex(/^[a-zA-z\s]*$/, {message: 'First name can only contain letters and spaces'}).min(2, { message: 'First name must be at least 2 characters'}).trim(),
    last: z.string({ required_error: 'Last name is required'}).regex(/^[a-zA-z\s]*$/, {message: 'Last name can only contain letters and spaces'}).min(2, { message: 'Last name must be at least 2 characters'}).trim(),
    username: z.string({ required_error: 'Username is required'}).regex(/^[a-zA-z0-9]*$/, {message: 'Username can only contain letters and numbers'}),
    password: z.string({ required_error: 'Password is required' }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.' }),
    password2: z.string({ required_error: 'Password confirmation is required' }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
            message:'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.' })   
})

// This code segment verifies the password and confirm password sections
// are the same. When added, I get an error with export const RegisterFormFieldNames

/* .superRefine(({ password2, password }, ctx) => {
    if (password2 !== password){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must match confirm password',
            path: ['password']
        });
    }
});
*/ 


export type RegisterFormModel = z.infer<typeof RegisterFormSchema>
export const RegisterFormFieldNames = RegisterFormSchema.keyof().Enum