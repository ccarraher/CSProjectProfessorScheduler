import { Box } from '@mui/material'
import { Providers } from './providers/providers'
import { BaseRouter } from './routing/base-router'

function App() {
  return (
    <>
      <Providers>
        <Box sx={{position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden'}}>
          <BaseRouter /> 
        </Box>
      </Providers>
    </>
  )
}

export default App
