import styles from './UserPage.module.css';
import UserTable from "../../features/UserTable/UserTable";
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import moment from 'moment';
import UserBySessionChart from '../../features/UserBySessionChart/UserBySessionChart';
import InactiveUsersChart from '../../features/InactiveUsersChart/InactiveUsersChart';
import type { TableCol } from '../../types/table.type';
import UserInfo from '../../components/ui/UserInfo/UserInfo';
import InputTextV2 from '../../components/ui/InputTextV2/InputTextV2';
import IconButton from '../../components/ui/IconButton/IconButton';
import { ListFilter, RotateCcw } from 'lucide-react';
import SideBarRight from '../../components/shared/SideBarRight/SideBarRight';
import Button from '../../components/ui/Button/Button';

const USER_TABLE_COLS: TableCol[] = [
  { key: 'name', header: 'User', sortable: true, transform: (row: any) => (<UserInfo content={row.name} label={row.email} />) },
  { key: 'created_at', header: 'Created At', sortable: true, transform: (row: any) => row.created_at ? moment(row.created_at).format('MMM D, YYYY h:mm A') : '-' },
  { key: 'last_sign_in_at', header: 'Last Sign in', sortable: true, transform: (row: any) => row.last_sign_in_at ? moment(row.last_sign_in_at).format('MMM D, YYYY h:mm A') : '-' },
  { key: 'session_count', header: 'Conversations', sortable: true }
];

const UserPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilter] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [createdFrom, setCreatedFrom] = useState('');
  const [createdTo, setCreatedTo] = useState('');
  const [signInFrom, setSignInFrom] = useState('');
  const [signInTo, setSignInTo] = useState('');

  useEffect(() => {
    refreshData();
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

    if (createdFrom) {
      filtered = filtered.filter(row => {
        const created = new Date(row.created_at);
        return created >= new Date(createdFrom);
      });
    }

    if (createdTo) {
      filtered = filtered.filter(row => {
        const created = new Date(row.created_at);
        return created <= new Date(createdTo + "T23:59:59");
      });
    }

    if (signInFrom) {
      filtered = filtered.filter(row => {
        const created = new Date(row.last_sign_in_at);
        return created >= new Date(signInFrom);
      });
    }

    if (signInTo) {
      filtered = filtered.filter(row => {
        const created = new Date(row.last_sign_in_at);
        return created <= new Date(signInTo + "T23:59:59");
      });
    }

    setFilteredData(filtered);
    setShowFilter(false);
  };

  const refreshData = () => {
    setCreatedFrom('');
    setCreatedTo('');
    setSignInFrom('');
    setSignInTo('');
    setData([]);
    requestData();
  }

  const requestData = () => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/user-sessions`)
      .then(res => res.json().then((res: any) => setData(res)))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }

  return (
    <div className={styles.container}>
      <div className={styles.user_table_content}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Registered Users ({filteredData.length || 0})</h3>
        <div className={styles.filter_container}>
          <IconButton icon={<ListFilter size={16} strokeWidth={1} />} onClick={() => setShowFilter(!showFilters)} />
          <IconButton icon={<RotateCcw size={16} strokeWidth={1} />} onClick={() => refreshData()} />
        </div>
        <UserTable loading={loading} data={filteredData} cols={USER_TABLE_COLS} />
      </div>
      <div className={styles.chats_content}>
        <UserBySessionChart loading={loading} data={filteredData} />
        <InactiveUsersChart loading={loading} data={filteredData} />
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
                value={createdFrom}
                label='From'
                max={createdTo || new Date().toISOString().split('T')[0]}
                onChange={(e: any) => setCreatedFrom(e.target.value)}
              />
              <InputTextV2
                name="to"
                id="to"
                type="date"
                value={createdTo}
                label='To'
                max={new Date().toISOString().split('T')[0]}
                min={createdFrom}
                onChange={(e: any) => setCreatedTo(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.form_section}>
            <span>Last Sign in</span>
            <div className={styles.form_date_container}>
              <InputTextV2
                name="from"
                id="from"
                type="date"
                value={signInFrom}
                label='From'
                max={signInTo || new Date().toISOString().split('T')[0]}
                onChange={(e: any) => setSignInFrom(e.target.value)}
              />
              <InputTextV2
                name="to"
                id="to"
                type="date"
                value={signInTo}
                label='To'
                max={new Date().toISOString().split('T')[0]}
                min={signInFrom}
                onChange={(e: any) => setSignInTo(e.target.value)}
              />
            </div>
          </div>
          <Button label='Apply' disabled={!signInFrom && !signInTo && !createdFrom && !createdTo && !search} onClick={() => applyFilters()} />
        </div>
      </SideBarRight>
    </div>
  );
};

export default UserPage;