import React, { useContext, useState } from 'react'
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignIn from '../components/Fragments/FormSignIn';
import { loginService } from '../services/authService';
import { AuthContext } from '../context/authContext';
import AppSnackbar from '../components/Elements/AppSnackbar';
import { DarkModeContext } from '../context/darkModeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function SignIn() {
  const { login } = useContext(AuthContext);

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

 	const handleLogin = async (email, password) => {
    try {
      const { refreshToken } = await loginService(email, password);
			login(refreshToken); 
    } catch (err) {
      console.error(err.msg);
    }
  };

  return (
    <AuthLayout>
      <FormSignIn onSubmit={handleLogin} />

      <div className="flex justify-center mt-6">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-xs font-medium bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm hover:scale-105 transition-all"
        >
          {isDarkMode ? (
            <>
              <LightModeIcon sx={{ fontSize: 16, color: '#E9A122' }} />
              <span>Switch to Light Mode</span>
            </>
          ) : (
            <>
              <DarkModeIcon sx={{ fontSize: 16, color: '#299D91' }} />
              <span>Switch to Dark Mode</span>
            </>
          )}
        </button>
      </div>

      	<AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
    </AuthLayout>
  );
}

export default SignIn