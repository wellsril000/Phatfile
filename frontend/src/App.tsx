import { useState } from 'react';
import FileUploader from './components/FileUploader';
import DataPreview from './components/DataPreview';
import { validateRow, ValidationError } from './utils/validateRow';
import { transformVendorData } from './transforms/transformVendor';

function App() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<number, ValidationError>>({});
  const cleanedData = transformVendorData(parsedData);

  const handleDataParsed = (data: any[]) => {
    const newErrors: Record<number, ValidationError> = {};

    data.forEach((row, i) => {
      const rowErrors = validateRow(row);
      if (Object.keys(rowErrors).length > 0) {
        newErrors[i] = rowErrors;
      }
    });

    setParsedData(data);
    setErrors(newErrors);
  };

  const handleCellEdit = (rowIndex: number, column: string, value: string) => {
    const updatedData = [...parsedData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [column]: value };
  
    // Revalidate only the edited row
    const updatedErrors = { ...errors };
    const newRowErrors = validateRow(updatedData[rowIndex]);
  
    if (Object.keys(newRowErrors).length > 0) {
      updatedErrors[rowIndex] = newRowErrors;
    } else {
      delete updatedErrors[rowIndex];
    }
  
    setParsedData(updatedData);
    setErrors(updatedErrors);
  };
  

  return (
    <div>
      <h1>Data Import Tool</h1>
      <FileUploader onDataParsed={handleDataParsed} />
      <DataPreview
  data={parsedData}
  errors={errors}
  onCellEdit={handleCellEdit}
/>
    </div>
  );
}

export default App;
