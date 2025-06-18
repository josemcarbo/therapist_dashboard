import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as Yup from 'yup';
import { useAuth } from "../../context/AuthContext";

const useLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const schema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(6, "Password too short")
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      login({ ...formik.values });
      navigate('/');
    }
  });

  const handleSignIn = () => { }
  const handleSignInWithGoogle = () => { }

  return { formik, handleSignIn, handleSignInWithGoogle }
}

export default useLoginPage;