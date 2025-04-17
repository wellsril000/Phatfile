export const vendorTemplate = {
    headers: [
      "Name", "AddressName", "AddressContact", "AddressType", "IsDefault", "Address",
      "City", "State", "Zip", "Country", "Main", "Home", "Work", "Mobile", "Fax",
      "Email", "Pager", "Web", "Other", "DefaultTerms", "DefaultShippingTerms",
      "Status", "AlertNotes", "URL", "DefaultCarrier", "MinOrderAmount",
      "Active", "AccountNumber", "CF-Custom"
    ],
    required: [
      "Name", "AddressName", "AddressType", "IsDefault", "Address",
      "City", "State", "Zip", "Country", "Status"
    ],
    defaults: {
      AddressType: "50",             // Main Office
      IsDefault: "true",
      Country: "USA",
      Status: "Normal",
      Active: "true",
      MinOrderAmount: "0",
      AlertNotes: "",
      URL: "", 
      DefaultCarrier: "",
      "CF-Custom": ""
    },
    formats: {
      Email: "email",
      Zip: "alphanumeric",
      AddressType: "numeric",
      MinOrderAmount: "numeric",
      Status: ["Normal", "Preferred", "Hold PO", "Hold Receipt", "Hold All"],
      Active: ["true", "false"]
    } as {[key: string]: string | string[]}
  };
  