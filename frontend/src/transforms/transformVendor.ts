import { vendorTemplate } from "../templates/vendorTemplate";

export interface VendorRecord {
  [key: string]: string;
}

export interface VendorValidationError {
  rowIndex: number;
  column: string;
  message: string;
}

export const transformVendorData = (
  rawData: any[],
  columnMappings: Record<string, string>
): { cleaned: VendorRecord[]; errors: VendorValidationError[] } => {
  const errors: VendorValidationError[] = [];
  const cleaned: VendorRecord[] = [];

  rawData.forEach((row, i) => {
    const transformedRow: VendorRecord = {};

    vendorTemplate.headers.forEach((header) => {
      const rawKey = Object.keys(columnMappings).find(
        (key) => columnMappings[key] === header
      );

      let value = rawKey ? row[rawKey]?.toString().trim() || "" : "";

      if (!value && vendorTemplate.defaults[header]) {
        value = vendorTemplate.defaults[header];
      }

      // Validate required fields
      if (vendorTemplate.required.includes(header) && !value) {
        errors.push({
          rowIndex: i,
          column: header,
          message: `${header} is required`
        });
      }

      // Validate format if defined
      const formatRule = vendorTemplate.formats?.[header];
      if (formatRule && value) {
        if (Array.isArray(formatRule) && !formatRule.includes(value)) {
          errors.push({
            rowIndex: i,
            column: header,
            message: `${header} must be one of: ${formatRule.join(", ")}`
          });
        } else if (formatRule === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
          errors.push({
            rowIndex: i,
            column: header,
            message: `Invalid email format`
          });
        } else if (formatRule === "numeric" && isNaN(Number(value))) {
          errors.push({
            rowIndex: i,
            column: header,
            message: `${header} must be a number`
          });
        }
      }

      transformedRow[header] = value;
    });

    cleaned.push(transformedRow);
  });

  return { cleaned, errors };
};
