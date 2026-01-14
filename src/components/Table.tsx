import React from "react";
import "./Table.css";

export interface TableColumn {
  header: string;
  width?: string;
}

interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  emptyMessage: string;
  renderRow: (item: T) => React.ReactNode;
}

export function Table<T extends { id: number | string }>({
  columns,
  data,
  emptyMessage,
  renderRow,
}: TableProps<T>) {
  return (
    <table className="custom-table"> 
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} style={{ width: col.width }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length}>{emptyMessage}</td>
          </tr>
        )}
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
}