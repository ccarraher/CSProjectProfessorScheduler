import * as React from "react";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const RhfCheckbox = ({
  label,
  name,
  muiProps,
  ...restProps
}: RhfCheckboxProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors ? errors[name] : undefined;

  const updatedMuiProps: CheckboxProps = {
    name,
    ...muiProps,
  };

  return (
    <FormControlLabel
      control={<Checkbox {...updatedMuiProps} {...register(name, restProps)} />}
      label={label}
    />
  );
};

interface RhfCheckboxProps {
  readonly name: string;
  readonly label: string;
  readonly muiProps?: CheckboxProps;
}
