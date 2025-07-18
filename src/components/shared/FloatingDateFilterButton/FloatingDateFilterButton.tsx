import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useUtilStore } from '../../../store/utilStore';
import InputText from '../../ui/InputText/InputText';
import styles from './FloatingDateFilterButton.module.css';
import Modal from '../Modal/Modal';
import Button from '../../ui/Button/Button';

export default function FloatingDateFilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { from, to, search, setFilter } = useUtilStore((state) => state._util);
  const [startDate, setStartDate] = useState(from);
  const [endDate, setEndDate] = useState(to);
  const [searchParam, setSearchParam] = useState(search);
  const [loading, setLoading] = useState(false);

  const handleSetRange = () => {
    setLoading(true);
    if (startDate <= endDate)
      setFilter(startDate, endDate, searchParam);
    else
      setFilter(endDate, startDate, searchParam);

    setIsOpen(false);
    setLoading(false);
  }

  return (
    <>
      <button
        className={styles.floating_button}
        onClick={() => setIsOpen(true)}
      >
        <i className={styles.icon}><Calendar size={22} strokeWidth={1} /></i>
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className={styles.content}>
            <h3>Select Date Range</h3>
            <InputText
              name="search"
              id="search"
              type="search"
              value={searchParam}
              label='Search'
              onChange={(e: any) => setSearchParam(e.target.value)}
            />
            <div className={styles.range_content}>
              <InputText
                name="from"
                id="from"
                type="date"
                value={startDate}
                label='Start date'
                onChange={(e: any) => setStartDate(e.target.value)}
              />
              <InputText
                name="to"
                id="to"
                type="date"
                value={endDate}
                label='End date'
                onChange={(e: any) => setEndDate(e.target.value)}
              />
            </div>
            <Button loading={loading} label='Apply' onClick={handleSetRange} />
          </div>
        </Modal>
      )}
    </>
  );
}