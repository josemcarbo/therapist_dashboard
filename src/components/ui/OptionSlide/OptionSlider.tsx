import React, { useState } from 'react';
import styles from './OptionSlider.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type TOption = {
  id: string;
  label: string;
};

type Props = {
  options: TOption[];
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
};

const OptionSlider: React.FC<Props> = ({ label, options, value, onChange }) => {
  const [index, setIndex] = useState<number>(options.findIndex(opt => opt.id === (value || options[0].id)));

  const handleNavClick = (i: number) => {
    const newIndex = i < 0 ? options.length - 1 : i >= options.length ? 0 : i;
    setIndex(newIndex);
    onChange?.(options[newIndex].id);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.options}>
        <a role='button' href='#'>
          <ChevronLeft
            strokeWidth={1} size={22}
            onClick={() => handleNavClick(index - 1)}
          />
        </a>
        <span>{options[index].label}</span>
        <a role='button' href='#'>
          <ChevronRight
            strokeWidth={1}
            size={22}
            onClick={() => handleNavClick(index + 1)}
          />
        </a>
      </div>
    </div>
  );
};

export default OptionSlider;