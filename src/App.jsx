// src/App.jsx
import React from "react";
import { SupabaseProvider } from "./context/SupabaseContext";
import Routes from "./Routes";

function App() {
  return (
    <SupabaseProvider>
      <Routes />
    </SupabaseProvider>
  );
}

export default App;