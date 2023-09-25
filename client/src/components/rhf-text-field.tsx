/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField, TextFieldProps } from "@mui/material"
import { FieldValues, useFormContext } from "react-hook-form"
import * as React from 'react'

export const RhfTextField = ({name, label, muiProps, ...restProps}: RhfTextField) => {
    const {register, formState: {errors}} = useFormContext()

    const error = errors ? errors[name] : undefined

    const updatedMuiProps: TextFieldProps = {
        name,
        label,
        error: !!error,
        helperText: error ? <React.Fragment>{error.message?.toString()}</React.Fragment> : undefined,
        variant: 'outlined',
        ...muiProps
    }

    return <TextField {...updatedMuiProps} {...register(name, restProps)}/>
}

export type RhfTextField = RhfBaseProps & OmittedValues & {
    readonly name: string
    readonly label: string
    readonly muiProps?: Omit<TextFieldProps, keyof OmittedValues | 'name' | 'label'>
}

export type RhfBaseProps = {
    readonly methods?: FieldValues
}

export type OmittedValues = OmittedValuesBase & (OmittedValuesString | OmittedValuesNumber | OmittedValuesDate)

type OmittedValuesBase = {
    readonly onChange?: (event: any) => void
    readonly onBlur?: (event: any) => void
    readonly disabled?: boolean
    readonly setValuesAs?: (value: any) => any
}

type OmittedValuesString = {
    readonly valueAsNumber?: false
    readonly valueAsDate?: false
}

type OmittedValuesNumber = {
    readonly valueAsNumber?: true
    readonly valueAsDate?: false
}

type OmittedValuesDate = {
    readonly valueAsNumber?: false
    readonly valueAsDate?: true
}