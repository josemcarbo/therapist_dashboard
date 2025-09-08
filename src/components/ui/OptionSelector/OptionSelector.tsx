import React, { useEffect, useState } from "react";
import styles from './OptionSelector.module.css';
import classNames from "classnames";

export type TOption = {
  id: string;
  label: string;
};

type Props = {
  name: string;
  options: TOption[];
  value?: string;
  label?: string;
  onChange?: (key: string, value: string) => void;
};

const OptionSelector: React.FC<Props> = ({ name, label, options, value, onChange }) => {
  const [active, setActive] = useState<string>(value || options[0].id);

  useEffect(() => {
    setActive(value || options[0].id);
  }, [value]);

  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(name, id);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {options.map(opt => (
            <li
              key={opt.id}
              className={classNames({ [styles.active]: active === opt.id })}
              onClick={() => handleClick(opt.id)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default OptionSelector;