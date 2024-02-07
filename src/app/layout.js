"use client"
import { StyledEngineProvider } from "@mui/material"
import "../../styles/scss/globals.scss"
import Providers from "./Providers"
import { Provider } from "react-redux"
import store from "./Redux/Store"
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Providers>{children}</Providers>
          <StyledEngineProvider injectFirst>
          </StyledEngineProvider>
        </Provider>
      </body>
    </html>
  )
}
