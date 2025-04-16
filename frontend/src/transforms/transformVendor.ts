export interface VendorRecord {
    Name: string;
    Number: string;
    Status: string;
    Phone: string;
    Email: string;
    Address: string;
    City: string;
    State: string;
    Zip: string;
    Country: string;
    Contact: string;
    Note: string;
  }
  
  export const transformVendorData = (rawData: any[]): VendorRecord[] => {
    return rawData.map((row) => {
      return {
        Name: row["Company"]?.toString().trim() || "",
        Number: row["Account #"]?.toString().trim() || "",
        Status: "Active",
        Phone: row["Phone"]?.toString().trim() || "",
        Email: row["E-Mail"]?.toString().trim() || "",
        Address: "", // No address column in messy data
        City: row["City"]?.toString().trim() || "",
        State: row["State"]?.toString().trim() || "",
        Zip: row["ZIP"]?.toString().trim() || "",
        Country: "Canada",
        Contact: "", // Can be added manually if needed
        Note: ""
      };
    });
  };
  