import { StyledEngineProvider } from "@mui/material"
import "../../styles/scss/globals.scss"
import { Providers } from "./Providers"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StyledEngineProvider injectFirst>
            {children}
          </StyledEngineProvider>
        </Providers>
      </body>
    </html>
  )
}
