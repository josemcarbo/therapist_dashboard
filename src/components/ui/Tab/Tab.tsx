import { useState } from "react";
import styles from "./Tab.module.css";

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

type Props = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: Props) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabButton} ${activeKey === tab.key ? styles.active : ""}`}
            onClick={() => setActiveKey(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabPanel}>
        {tabs.find((tab) => tab.key === activeKey)?.content}
      </div>
    </div>
  );
}