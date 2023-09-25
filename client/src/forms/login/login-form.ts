import {z} from 'zod'

export const LoginFormSchema = z.object({
    username: z.string().refine(val => val.length > 0, "Username is required"),
    password: z.string().refine(val => val.length > 0, "Password is required")
})

export type LoginFormModel = z.infer<typeof LoginFormSchema>

export const LoginFormFieldNames = LoginFormSchema.keyof().Enum