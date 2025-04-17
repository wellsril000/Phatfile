import { customerTemplate } from "../templates/customerTemplate";

export interface CustomerRecord {
  [key: string]: string;
}

export interface CustomerValidationError {
  rowIndex: number;
  column: string;
  message: string;
}

export const transformCustomerData = (
  rawData: any[]
): { cleaned: CustomerRecord[]; errors: CustomerValidationError[] } => {
  const errors: CustomerValidationError[] = [];
  const cleaned: CustomerRecord[] = [];

  rawData.forEach((row, i) => {
    const transformedRow: CustomerRecord = {};

    customerTemplate.headers.forEach((header) => {
      let value = "";

      // Example mappings from messy field names
      switch (header) {
        case "Name":
          value = row["Customer Name"]?.trim() || row["Name"]?.trim() || "";
          break;
        case "Email":
          value = row["Email"]?.trim() || row["E-Mail"]?.trim() || "";
          break;
        case "Phone":
          value = row["Phone"]?.trim() || "";
          break;
        case "City":
          value = row["City"]?.trim() || "";
          break;
        case "State":
          value = row["State"]?.trim() || "";
          break;
        case "Zip":
          value = row["ZIP"]?.trim() || "";
          break;
        case "Country":
          value = row["Country"]?.trim() || "";
          break;
        case "Status":
          value = row["Status"]?.trim() || customerTemplate.defaults[header] || "";
          break;
        default:
          value = customerTemplate.defaults[header] || "";
          break;
      }

      // Required field validation
      if (customerTemplate.required.includes(header) && !value) {
        errors.push({
          rowIndex: i,
          column: header,
          message: `${header} is required`
        });
      }

      // Format validation
      const formatRule = customerTemplate.formats[header];
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
            message: "Invalid email format"
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
