import { useEffect, useState } from "react";
import styles from "./Table.module.css";
import type { TableCol } from "../../../types/table.type";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  columns: TableCol[];
  data: any[];
};

export default function Table({ columns, data }: Props) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortedData, setSortedData] = useState<any[]>(data);


  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  useEffect(() => {
    console.log({ data, sortKey, sortOrder });
    setSortedData(toSortedData());
  }, [data, sortKey, sortOrder]);

  const toSortedData = () => [...data].sort((a, b) => {
    if (!sortKey) return 0;

    const valA = a[sortKey];
    const valB = b[sortKey];

    if (valA === undefined || valB === undefined) return 0;

    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                style={{
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                <div className={styles.headerCell}>
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <>
                      {
                        sortOrder === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (<ChevronDown size={16} />)
                      }
                    </>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>{col.transform ? col.transform(row) : row[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}