import { ppvpTemplate } from "../templates/ppvpTemplate";

export interface PPVPRecord {
  [key: string]: string;
}

export interface PPVPValidationError {
  rowIndex: number;
  column: string;
  message: string;
}

export const transformPPVPData = (
  rawData: any[],
  columnMappings: Record<string, string>
): { cleaned: PPVPRecord[]; errors: PPVPValidationError[] } => {
  const errors: PPVPValidationError[] = [];
  const cleaned: PPVPRecord[] = [];

  rawData.forEach((row, i) => {
    const transformedRow: PPVPRecord = {};

    ppvpTemplate.headers.forEach((header) => {
      // ✅ Use the correct mapping direction
      const rawKey = columnMappings[header];

      let value = rawKey ? row[rawKey]?.toString().trim() || "" : "";

      // Use default if no value found
      if (!value && ppvpTemplate.defaults[header]) {
        value = ppvpTemplate.defaults[header];
      }

      // Validate required fields
      if (ppvpTemplate.required.includes(header) && !value) {
        errors.push({
          rowIndex: i,
          column: header,
          message: `${header} is required`
        });
      }

      // Validate format
      const rule = ppvpTemplate.formats?.[header];
      if (rule && value) {
        if (Array.isArray(rule) && !rule.includes(value)) {
          errors.push({
            rowIndex: i,
            column: header,
            message: `${header} must be one of: ${rule.join(", ")}`
          });
        } else if (rule === "numeric" && isNaN(Number(value))) {
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
