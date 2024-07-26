// import React from 'react'
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { AuthProvider } from "./utils/authProvider.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
    // Comment strict mode agar tidak double fetching API dan membuat error 429 Too many requests
    // <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
    // </React.StrictMode>,
)
