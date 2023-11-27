import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RhfTextField } from "../components/rhf-text-field";
import {
  RegisterFormFieldNames,
  RegisterFormSchema,
} from "../forms/login/register-form";
import { Paper, Typography, Button, Box, Link, useTheme } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RhfCheckbox } from "../components/rhf-checkbox";

const requestUrl = "http://localhost:8080/auth/register";

export const RegisterPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const register: SubmitHandler<RegisterFormInputs> = (
    userCreds: RegisterFormInputs
  ) => {
    const body = {
      firstName: userCreds.firstName,
      lastName: userCreds.lastName,
      username: userCreds.username,
      password: userCreds.password,
      isAdmin: userCreds.isAdmin,
    };
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => navigate("/login"));
  };
  const defaultValues: RegisterFormInputs = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    password2: "",
    isAdmin: false,
  };
  const methods = useForm<RegisterFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "500px", padding: "32px" }}>
        <FormProvider {...methods}>
          <Box
            onSubmit={handleSubmit(register)}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(4),
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h3">
              Sign Up
            </Typography>
            <RhfTextField
              name={RegisterFormFieldNames.firstName}
              label="First Name"
              muiProps={{ required: true }}
            />
            <RhfTextField
              name={RegisterFormFieldNames.lastName}
              label="Last Name"
              muiProps={{ required: true }}
            />
            <RhfTextField
              name={RegisterFormFieldNames.username}
              label="Username"
              muiProps={{ required: true }}
            />
            <RhfTextField
              name={RegisterFormFieldNames.password}
              label="Password"
              muiProps={{ required: true, type: "password" }}
            />
            <RhfTextField
              name={RegisterFormFieldNames.password2}
              label="Confirm Password"
              muiProps={{ required: true, type: "password" }}
            />
            <RhfCheckbox
              name={RegisterFormFieldNames.isAdmin}
              label={"Admin?"}
            />
            <Button onClick={handleSubmit(register)} variant="contained">
              Sign Up
            </Button>
          </Box>
        </FormProvider>
        <Typography align="center">
          <Link component={RouterLink} to="/login">
            Already have an account? Log-in here.
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export interface RegisterFormInputs {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly password: string;
  readonly password2: string;
  readonly isAdmin: boolean;
}
