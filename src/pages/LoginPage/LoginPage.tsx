import styles from './LoginPage.module.css';
import Button from "../../components/ui/Button/Button";
import InputText from "../../components/ui/InputText/InputText";
import ElementContainer from "../../components/ui/ElementContainer/ElementContainer";
import InputPassword from "../../components/ui/InputPassword/InputPassword";
import useLoginPage from "./useLoginPage";
import Logo from '../../components/shared/Logo/Logo';

const LoginPage = () => {
  const { formik, error } = useLoginPage();

  return (
    <section className={styles.content}>
      <ElementContainer size="medium">
        <Logo />
        <h1>Welcome back</h1>
        <p>Sign in to your account</p>
      </ElementContainer>
      <form onSubmit={formik.handleSubmit}>
        <InputText
          label="Email"
          name="email"
          id="email"
          placeholder="you@example.com"
          value={formik.values.email}
          error={(formik.touched.email && formik.errors.email) ? formik.errors.email : ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputPassword
          label="Password"
          name="password"
          id="password"
          value={formik.values.password}
          error={(formik.touched.password && formik.errors.password) ? formik.errors.password : ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {error && (<span className={styles.error}>{error}</span>)}
        <Button label="Sign In" />
      </form>
    </section>
  );
};

export default LoginPage;