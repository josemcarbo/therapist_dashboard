import styles from './SessionPage.module.css';
import TherapistChart from "../../features/TherapistChart/TherapistChart";
import SessionChart from "../../features/SessionChart/SessionChart";
import SessionTable from "../../features/SessionTable/SessionTable";
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import IconButton from '../../components/ui/IconButton/IconButton';
import { ListFilter, RotateCcw } from 'lucide-react';
import InputTextV2 from '../../components/ui/InputTextV2/InputTextV2';
import Button from '../../components/ui/Button/Button';
import SideBarRight from '../../components/shared/SideBarRight/SideBarRight';

const SessionPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilter] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');


  useEffect(() => {
    requestData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const applyFilters = () => {
    let filtered = [...data];

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    if (from) {
      filtered = filtered.filter((row: any) => {
        const created = new Date(row.created_at);
        return created >= new Date(from);
      });
    }

    if (to) {
      filtered = filtered.filter((row: any) => {
        const created = new Date(row.created_at);
        return created <= new Date(to + "T23:59:59");
      });
    }

    setFilteredData(filtered);
    setShowFilter(false);
  };

  const refreshData = () => {
    setFrom('');
    setTo('');
    setData([]);
    requestData();
  }

  const requestData = () => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/sessions`)
      .then(res => res.json().then((res: any) => setData(res)))
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <div className={styles.user_table_content}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>List of conversations ({filteredData.length || 0})</h3>
          <div className={styles.filter_container}>
            <IconButton icon={<ListFilter size={16} strokeWidth={1} />} onClick={() => setShowFilter(!showFilters)} />
            <IconButton icon={<RotateCcw size={16} strokeWidth={1} />} onClick={() => refreshData()} />
          </div>
          <SessionTable data={filteredData} loading={loading} />
        </div>
        <div className={styles.chats_content}>
          <TherapistChart data={filteredData} loading={loading} />
          <SessionChart data={filteredData} loading={loading} />
        </div>
      </div>
      <SideBarRight show={showFilters} onClose={() => setShowFilter(false)}>
        <div className={styles.form_container}>
          <h3>Filters</h3>
          <InputTextV2
            name="search"
            id="search"
            type="search"
            value={search}
            placeholder='Search'
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <div className={styles.form_section}>
            <span>Created At</span>
            <div className={styles.form_date_container}>
              <InputTextV2
                name="from"
                id="from"
                type="date"
                value={from}
                label='From'
                max={to || new Date().toISOString().split('T')[0]}
                onChange={(e: any) => setFrom(e.target.value)}
              />
              <InputTextV2
                name="to"
                id="to"
                type="date"
                value={to}
                label='To'
                max={new Date().toISOString().split('T')[0]}
                min={from}
                onChange={(e: any) => setTo(e.target.value)}
              />
            </div>
          </div>
          <Button label='Apply' disabled={!from && !to && !search} onClick={() => applyFilters()} />
        </div>
      </SideBarRight>
    </div>
  );
};

export default SessionPage;