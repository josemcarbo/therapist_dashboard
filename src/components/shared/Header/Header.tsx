import { useUtilStore } from "../../../store/utilStore";
import ElementContainer from "../../ui/ElementContainer/ElementContainer";
import InputText from "../../ui/InputText/InputText";
import Logo from "../Logo/Logo";
import styles from './Header.module.css'

const Header = () => {
  const {from, to, setFrom, setTo} = useUtilStore((state) => state._util);

  return (
    <header className={styles.content}>
      <ElementContainer size="medium" orientation="horizontal">
        <Logo />
      </ElementContainer>
      <ElementContainer size="medium" orientation="horizontal">
        <InputText
            name="from"
            id="from"
            type="date"
            value={from}
            onChange={(e: any) => setFrom(e.target.value)}
          />
          <InputText
            name="to"
            id="to"
            type="date"
            value={to}
            onChange={(e: any) => setTo(e.target.value)}
          />
          {/* <Button label="Apply filter" variant="primary"/> */}
      </ElementContainer>
    </header>
  );
};

export default Header;