import { StyledEngineProvider } from "@mui/material"
import "../../styles/scss/globals.scss"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledEngineProvider injectFirst>
          {children}
        </StyledEngineProvider>
      </body>
    </html>
  )
}
