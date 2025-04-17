export const customerTemplate = {
    headers: [
      "Name", "AddressName", "AddressContact", "AddressType", "IsDefault", "Address",
      "City", "State", "Zip", "Country", "Residential", "Main", "Home", "Work",
      "Mobile", "Fax", "Email", "Pager", "Web", "Other", "Group", "CreditLimit",
      "Status", "Active", "TaxRate", "Salesman", "DefaultPriority", "Number",
      "PaymentTerms", "TaxExempt", "TaxExemptNumber", "URL", "CarrierName",
      "CarrierService", "ShippingTerms", "AlertNotes", "QuickBooksClassName",
      "ToBeEmailed", "ToBePrinted", "IssuableStatus",
      "CF-Shipping Carrier Acct", "CF-Customer Since", "CF-Customer Origination"
    ],
    required: [
      "Name", "Address", "City", "State", "Zip", "Country", "Status", "Active"
    ],
    defaults: {
      AddressType: "50", // Main Office
      IsDefault: "true",
      Country: "USA",
      Status: "Normal",
      Active: "true",
      CreditLimit: "0",
      Residential: "false",
      ToBeEmailed: "false",
      ToBePrinted: "false"
    },
    formats: {
      Email: "email",
      Zip: "alphanumeric",
      CreditLimit: "numeric",
      Active: ["true", "false"],
      Residential: ["true", "false"],
      Status: ["Normal", "Preferred", "Hold Sales", "Hold Shipment", "Hold All"],
      DefaultPriority: ["1-Highest", "2-High", "3-Normal", "4-Low", "5-Lowest"],
      ToBeEmailed: ["true", "false"],
      ToBePrinted: ["true", "false"],
      TaxExempt: ["true", "false"]
    }
  };
  