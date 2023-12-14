import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Roboto font imports
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { Layout } from "./pages/Layout"
import { Home } from "./pages/Home"
import { TestFingerprint } from "./pages/TestFingerprint"
import { TestAES } from "./pages/TestAES"
import { TestRSA_Single } from "./pages/TestRSA/Single"
import { TestRSA_WithBackend } from "./pages/TestRSA/WithBackend"
import { TestRSA_Manual } from "./pages/TestRSA/Manual"

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/fingerprint",
      element: <TestFingerprint />
    },
    {
      path: "/aes",
      element: <TestAES />
    },
    {
      path: "/rsa-single",
      element: <TestRSA_Single />
    },
    {
      path: "/rsa-backend",
      element: <TestRSA_WithBackend />
    },
    {
      path: "/rsa-manual",
      element: <TestRSA_Manual />
    },
  ])
  
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}

async function main() {
  // @ts-ignore
  ReactDOM.createRoot(document.getElementById("root")).render(<App />)
}

main()
