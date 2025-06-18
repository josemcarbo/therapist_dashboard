import { Link } from 'react-router-dom';
import Button from "../../components/ui/Button/Button";
import ElementContainer from "../../components/ui/ElementContainer/ElementContainer";
import InputText from "../../components/ui/InputText/InputText";
import styles from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
  return (
    <section className={styles.content}>
      <ElementContainer size="medium">
        <h1>Reset your password</h1>
        <p>Type in your email and we'll send you a link to reset your password</p>
      </ElementContainer>
      <form>
        <InputText
          label="Email"
          name="email"
          id="email"
          placeholder="you@example.com"
          onChange={(v) => console.log(v)}
        />
        <Button label="Send reset email" />
      </form>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </section>
  );
};

export default ForgotPasswordPage;