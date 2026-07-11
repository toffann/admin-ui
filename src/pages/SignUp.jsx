import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignUp from '../components/Fragments/FormSignUp';
import AppSnackbar from '../components/Elements/AppSnackbar';

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await axios.post('https://jwt-auth-eight-neon.vercel.app/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      setSnackbar({
        open: true,
        message: "Register Berhasil",
        severity: "success",
      });

      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.msg || "Email sudah pernah digunakan sebelumnya",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <FormSignUp onSubmit={handleRegister} isLoading={loading} />

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