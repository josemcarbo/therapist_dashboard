import { Link } from "react-router-dom";
import styles from './RegisterPage.module.css'
import Button from "../../components/ui/Button/Button";
import Separator from "../../components/ui/Separator/Separator";
import googleIcon from '../../assets/images/google.png';
import ElementContainer from "../../components/ui/ElementContainer/ElementContainer";
import InputText from "../../components/ui/InputText/InputText";
import InputPassword from "../../components/ui/InputPassword/InputPassword";

const RegisterPage = () => {
  const handleSignInWithGoogle = () => { }

  return (
    <section className={styles.content}>
      <ElementContainer size="medium">
        <h1>Get started</h1>
        <p>Create a new account</p>
      </ElementContainer>
      <Button type="button" variant="secondary" label="Continue with Google" icon={googleIcon} onClick={handleSignInWithGoogle} />
      <Separator label="or" />
      <form>
        <InputText label="Name" name="name" id="name" placeholder="Name" onChange={(v) => console.log(v)} />
        <InputText label="Email" name="email" id="email" placeholder="you@example.com" onChange={(v) => console.log(v)} />
        <InputPassword
          label="Password"
          name="password"
          id="password"
          onChange={(v) => console.log(v)}
        />
        <InputPassword
          label="Confirm password"
          name="confirm"
          id="confirm"
          onChange={(v) => console.log(v)}
        />
        <Button label="Sign Up" />
      </form>
      <p>Have an account? <Link to="/login">Sign In Now</Link></p>
    </section>
  );
};

export default RegisterPage;