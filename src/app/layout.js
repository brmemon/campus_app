import { StyledEngineProvider } from "@mui/material"
import "../../styles/scss/globals.scss"
import Providers from "./Providers"
export default function RootLayout({ children }) {
  // console.log("layoout.js");
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
