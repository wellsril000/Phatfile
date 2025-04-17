import React, { useState } from 'react';

interface DataPreviewProps {
  data: any[];
  errors: Record<number, Record<string, string>>;
  onCellEdit: (rowIndex: number, column: string, value: string) => void;
  defaultLimit?: number; // optional limit to start with
}

const DataPreview = ({ data, errors, onCellEdit, defaultLimit = 20 }: DataPreviewProps) => {
  const [showAll, setShowAll] = useState(false);

  if (data.length === 0) return <p>No data to preview</p>;

  const headers = Object.keys(data[0]);
  const rowsToShow = showAll ? data : data.slice(0, defaultLimit);

  return (
    <div>
      <p className="text-muted">
        Showing {rowsToShow.length} of {data.length} rows
      </p>

      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsToShow.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => {
                const hasError = errors[rowIndex]?.[header];
                return (
                  <td
                    key={header}
                    style={{
                      backgroundColor: hasError ? "#ffe5e5" : undefined,
                      borderColor: hasError ? "red" : undefined,
                      color: hasError ? "darkred" : undefined,
                    }}
                    title={hasError || ""}
                  >
                    <input
                      type="text"
                      value={row[header]}
                      onChange={(e) => onCellEdit(rowIndex, header, e.target.value)}
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        outline: "none",
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length > defaultLimit && (
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Fewer Rows" : "Show All Rows"}
        </button>
      )}
    </div>
  );
};

export default DataPreview;
