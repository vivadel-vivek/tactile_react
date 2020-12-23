import React from "react";
// Router
import AppRouter from "router/AppRouter.js";
// Context
// import { Provider as AuthProvider } from "context/AmplifyAuthContext";
import { Provider as ThemeProvider } from "context/ColorThemeContext";

// App is our main app
// To keep things clean, limit this to importing routers and state management such as context
function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
