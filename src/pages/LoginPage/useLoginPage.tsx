import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { PASSWORD, USER } from "../../constants";

const useLoginPage = () => {
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    // validationSchema: schema,
    onSubmit: (values) => {
      if (values.email != USER || values.password != PASSWORD) {
        setError("Invalid credentials")
      } else {
        login({ ...values });
        navigate('/');
      }
    }
  });

  const handleSignIn = () => { }
  const handleSignInWithGoogle = () => { }

  return { formik, handleSignIn, handleSignInWithGoogle, error }
}

export default useLoginPage;