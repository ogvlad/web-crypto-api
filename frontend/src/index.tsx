import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Roboto font imports
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { Layout } from "./_tests/Layout"
import { Home } from "./_tests/Home"
import { TestFingerprint } from "./_tests/TestFingerprint"
import { TestAES } from "./_tests/TestAES"
import { TestRSA_Single } from "./_tests/TestRSA/Single"
import { TestRSA_WithBackend } from "./_tests/TestRSA/WithBackend"
import { TestRSA_ManualEncryption } from "./_tests/TestRSA/ManualEncryption"
import { TestRSA_ManualDecryption } from "./_tests/TestRSA/ManualDecryption"
import { TestRSA_OnlyBackend } from "./_tests/TestRSA/OnlyBackend"

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "fingerprint",
        element: <TestFingerprint />
      },
      {
        path: "aes",
        element: <TestAES />
      },
      {
        path: "rsa-single",
        element: <TestRSA_Single />
      },
      {
        path: "rsa-manual-encryption",
        element: <TestRSA_ManualEncryption />
      },
      {
        path: "rsa-manual-decryption",
        element: <TestRSA_ManualDecryption />
      },
      {
        path: "rsa-backend",
        element: <TestRSA_WithBackend />
      },
      {
        path: "rsa-backend-only",
        element: <TestRSA_OnlyBackend />
      },
    ]
  }
]

const router = createBrowserRouter(routes, { basename: "/" })

const App = () => {
  
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

async function main() {
  // @ts-ignore
  ReactDOM.createRoot(document.getElementById("root")).render(<App />)
}

main()
