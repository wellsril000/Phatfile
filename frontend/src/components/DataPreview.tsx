import React from 'react';

interface DataPreviewProps {
  data: any[];
  errors: Record<number, Record<string, string>>;
  onCellEdit: (rowIndex: number, column: string, value: string) => void;
}

const DataPreview = ({ data, errors, onCellEdit }: DataPreviewProps) => {
  if (data.length === 0) return <p>No data to preview</p>;

  const headers = Object.keys(data[0]);

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              style={{
                border: '1px solid #ccc',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => {
              const value = row[header];
              const hasError = errors[rowIndex]?.[header];

              return (
                <td
                  key={header}
                  style={{
                    border: '1px solid #ccc',
                    padding: '6px',
                    backgroundColor: hasError ? '#ffe5e5' : undefined,
                    borderColor: hasError ? 'red' : '#ccc',
                  }}
                  title={hasError || ''}
                >
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onCellEdit(rowIndex, header, e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      color: hasError ? 'darkred' : 'inherit',
                    }}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataPreview;
