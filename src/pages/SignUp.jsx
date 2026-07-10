import React, { useState } from 'react'
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignUp from '../components/Fragments/FormSignUp';
import { registerService } from '../services/authService';
import AppSnackbar from '../components/Elements/AppSnackbar';

function SignUp() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (name, email, password) => {
    try {
      const response = await registerService(name, email, password);
      
      setSnackbar({
        open: true,
        message: response.msg || "Register Berhasil",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.msg || "Register Gagal",
        severity: "error",
      });
    }
  };

  return (
    <AuthLayout>
        {/* HANYA MENGUBAH DI SINI: Menghubungkan fungsi ke FormSignUp */}
        <FormSignUp onSubmit={handleRegister} /> 

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
    </AuthLayout>
  );
}

export default SignUp;