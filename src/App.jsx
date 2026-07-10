import "./App.css";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ErrorPage from "./pages/error";
import DashboardPage from "./pages/dashboard";
import BalancePage from "./pages/balance";
import ExpensePage from "./pages/expense";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Children, useContext } from "react";
import { AuthContext } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

function App() {
  const { user } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const NotRequireAuth = ({ children }) => {
    return user ? <Navigate to="/" /> : children;
  };

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth>
          <DashboardPage />
        </RequireAuth>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: (
        <NotRequireAuth>
          <SignInPage />
        </NotRequireAuth>
      ),
    },
    {
      path: "/register",
      element: (
        <NotRequireAuth>
          <SignUpPage />
        </NotRequireAuth>
      ),
    },
    {
      path: "/balance",
      element: (
        <RequireAuth>
          <BalancePage />
        </RequireAuth>
      ),
    },
    {
      path: "/expense",
      element: <ExpensePage />, 
    },
    {
      path: "/dashboard",
      element: <DashboardPage />, 
    },
  ]);
  
  return (
    <>
    <DarkModeContextProvider>
      <RouterProvider router={myRouter} />
    </DarkModeContextProvider>
    </>
  );
}

export default App;