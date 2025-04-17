import { useState } from 'react';
import FileUploader from './components/FileUploader';
import DataPreview from './components/DataPreview';
import { validateRow, ValidationError } from './utils/validateRow';
import { transformVendorData, VendorValidationError } from './transforms/transformVendor';
import Papa from 'papaparse';
import TemplatePreview from './components/TemplatePreview';
import { transformCustomerData } from './transforms/transformCustomer';
import { customerTemplate } from './templates/customerTemplate';
import { vendorTemplate } from './templates/vendorTemplate';
import { transformPPVPData } from './transforms/transformPPVP';
import { ppvpTemplate } from './templates/ppvpTemplate';
import { generateAutoMappings } from './utils/generateAutoMappings';




function App() {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<number, ValidationError>>({});
  const [cleanedData, setCleanedData] = useState<any[]>([]);
  const [importType, setImportType] = useState<string>("");
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState<VendorValidationError[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // these are for column header manual mapping
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>({});
  const [rawHeaders, setRawHeaders] = useState<string[]>([]);


  const handleTransform = () => {
    if (importType === "Vendor") {
      const { cleaned, errors } = transformVendorData(parsedData, columnMappings);

      setCleanedData(cleaned);
      setValidationErrors(errors);
      setShowValidationErrors(false);
    } else if (importType === "Customer") {
      const { cleaned, errors } = transformCustomerData(parsedData);
      setCleanedData(cleaned);
      setValidationErrors(errors);
      setShowValidationErrors(false);
    } else if (importType === "PPVP") {
      const { cleaned, errors } = transformPPVPData(parsedData, columnMappings);

      setCleanedData(cleaned);
      setValidationErrors(errors);
      setShowValidationErrors(false);
    }
  };
  
  
  


  
  

  const handleDownloadCleanData = () => {
    const csv = Papa.unparse(cleanedData);
    const filename = `cleaned-${importType.toLowerCase()}-data.csv`; // ✅ dynamic filename
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleDataParsed = (data: any[]) => {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
  
    let templateHeaders: string[] = [];
    if (importType === "Vendor") templateHeaders = vendorTemplate.headers;
    else if (importType === "Customer") templateHeaders = customerTemplate.headers;
    else if (importType === "PPVP") templateHeaders = ppvpTemplate.headers;
  
    const autoMapped = generateAutoMappings(headers, templateHeaders);
  
    setParsedData(data);
    setErrors({});
    setRawHeaders(headers);
    setColumnMappings(autoMapped); // 👈 AUTO-FILL the mappings
    setCleanedData([]);
  };
  
  
  

  const handleCellEdit = (rowIndex: number, column: string, value: string) => {
    const updatedData = [...parsedData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [column]: value };

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
    <div className="container my-5">
      <h1 className="mb-4">📦 Fishbowl Data Import Tool</h1>

      <div className="row my-4">
  <div className="col-md-6">
    <label htmlFor="importType" className="form-label">Select Import Type:</label>
    <select
      id="importType"
      className="form-select"
      value={importType}
      onChange={(e) => setImportType(e.target.value)}
    >
      <option value="">-- Choose an import type --</option>
      <option value="Vendor">Vendor</option>
      <option value="Customer">Customer</option>
      <option value="PPVP">Part Product and Vendor Pricing (PPVP)</option>
    </select>
  </div>


  
      {/* <div className="mb-4">
        <FileUploader onDataParsed={handleDataParsed} />
      </div> */}

{importType && (
  <div className="mb-4">
    <FileUploader onDataParsed={handleDataParsed} />
  </div>
)}

  
      {parsedData.length > 0 && (
        <>
          <h4>Raw Uploaded Data</h4>
          <DataPreview data={parsedData} errors={errors} onCellEdit={handleCellEdit} />

        </>
      )}

    {/* ADDING IN CUSTOM COLUMN MAPPING */}
    {parsedData.length > 0 && importType && (
  <div className="mt-4">
    <h5>🧭 Match Columns to Your File</h5>
    <p className="text-muted">Match required Fishbowl fields to columns in your uploaded file.</p>

    <table className="table table-sm table-bordered">
      <thead>
        <tr>
          <th>Template Field</th>
          <th>Map to Column</th>
        </tr>
      </thead>
      <tbody>
        {(
          importType === "Vendor"
            ? vendorTemplate.headers
            : importType === "Customer"
            ? customerTemplate.headers
            : ppvpTemplate.headers
        ).map((templateHeader) => {
          // Determine selected values in use so we can exclude them from others
          const usedRawHeaders = Object.values(columnMappings).filter(Boolean);
          const availableOptions = rawHeaders.filter(
            (raw) => !usedRawHeaders.includes(raw) || columnMappings[templateHeader] === raw
          );

          return (
            <tr key={templateHeader}>
              <td>{templateHeader}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={columnMappings[templateHeader] || ""}
                  onChange={(e) =>
                    setColumnMappings((prev) => ({
                      ...prev,
                      [templateHeader]: e.target.value || "",
                    }))
                  }
                >
                  <option value="">-- Ignore this column --</option>
                  {availableOptions.map((rawHeader) => (
                    <option key={rawHeader} value={rawHeader}>
                      {rawHeader}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}


  

  <div className="col-md-6 d-flex align-items-end">
  {["Vendor", "Customer", "PPVP"].includes(importType) && parsedData.length > 0 && (
  <button className="btn btn-primary w-100" onClick={handleTransform}>
    Transform Data
  </button>
)}

  </div>

  {validationErrors.length > 0 && (
  <div className="col-12 mt-3">
    <button
      className="btn btn-outline-danger btn-sm mb-2"
      onClick={() => setShowValidationErrors(!showValidationErrors)}
    >
      {showValidationErrors ? "Hide" : "Show"} Validation Issues
    </button>

    {showValidationErrors && (
      <div className="alert alert-warning mt-2">
        <strong>Validation Issues:</strong>
        <ul>
          {validationErrors.map((e, i) => (
            <li key={i}>
              Row {e.rowIndex + 1}, Column "{e.column}": {e.message}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}




  <div className="col-12 mt-3">
  {importType && (
    <>
      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => setShowTemplatePreview(!showTemplatePreview)}
      >
        {showTemplatePreview ? "Hide" : "Show"} Template Preview
      </button>

      {showTemplatePreview && (
        <TemplatePreview
        template={
          importType === "Vendor"
            ? vendorTemplate
            : importType === "Customer"
            ? customerTemplate
            : ppvpTemplate
        }
      />
      )}
    </>
  )}
</div>


</div>

  
      {cleanedData.length > 0 && (
        <>
          <h4>✅ Transformed Data Preview</h4>
          <DataPreview data={cleanedData} errors={{}} onCellEdit={() => {}} />

  
          <div className="mt-3">
            <button className="btn btn-success" onClick={handleDownloadCleanData}>
              Download Cleaned File
            </button>
          </div>
        </>
      )}
    </div>
  );
  
}

export default App;
