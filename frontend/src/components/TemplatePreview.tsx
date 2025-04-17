// TemplatePreview.tsx
import React from 'react';

interface TemplatePreviewProps {
  template: {
    headers: string[];
    required: string[];
    defaults: Record<string, string>;
    formats?: Record<string, string | string[]>;
  };
}

const TemplatePreview = ({ template }: TemplatePreviewProps) => {
  return (
    <div className="card my-4">
      <div className="card-body">
        <h5 className="card-title">Template Preview</h5>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>Column</th>
              <th>Required</th>
              <th>Default</th>
              <th>Format / Allowed Values</th>
            </tr>
          </thead>
          <tbody>
            {template.headers.map((header) => (
              <tr key={header}>
                <td>{header}</td>
                <td>{template.required.includes(header) ? "✅" : ""}</td>
                <td>{template.defaults[header] || ""}</td>
                <td>
                  {Array.isArray(template.formats?.[header])
                    ? template.formats[header].join(", ")
                    : template.formats?.[header] || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TemplatePreview;
