import React, { useState } from "react";
import { Box } from '@mui/material'
import { Providers } from './providers/providers'
import { BaseRouter } from './routing/base-router'
import { RegisterPage } from "./pages/register-page";
import { LoginPage } from "./pages/login-page";

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName: React.SetStateAction<string>) => {
    setCurrentForm(formName);
  }
  return (
    <>
      <Providers>
        <Box sx={{position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden'}}>
          {
            currentForm === 'login' ? < LoginPage onFormSwitch={toggleForm}/> : <RegisterPage onFormSwitch={toggleForm} />
          }
          <BaseRouter /> 
        </Box>
      </Providers>
    </>
  )
}

export default App
