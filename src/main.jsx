import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './provider/AuthProvider';
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-100 min-h-screen h-full pb-4">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  </AuthProvider>
)
