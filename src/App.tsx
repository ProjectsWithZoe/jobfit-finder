import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Contact } from "@/components/sections/Contact";

import { Features } from "@/components/sections/Features";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />*/}
            <Route path="/features" element={<Features />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
