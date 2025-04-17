export const ppvpTemplate = {
    headers: [
      "PartNumber", "PartDescription", "PartDetails", "UOM", "UPC", "PartTypeID",
      "Active", "StdCost", "Tracks-Lot Number", "Next Value-Lot Number",
      "Tracks-Revision Level", "Next Value-Revision Level",
      "Tracks-Expiration Date", "Next Value-Expiration Date",
      "Tracks-Serial Number", "Next Value-Serial Number",
      "AssetAccount", "COGSAccount", "AdjustmentAccount", "ScrapAccount", "VarianceAccount",
      "ABCCode", "Weight", "WeightUOM", "Width", "Height", "Len", "SizeUOM",
      "ConsumptionRate", "PartURL", "PartRevision", "CF-Custom",
      "ProductNumber", "ProductDescription", "ProductDetails", "Price",
      "ProductSKU", "ProductUPC", "ProductActive", "ProductTaxable",
      "ProductSOItemTypeID", "IncomeAccount", "ProductWeight", "ProductWeightUOM",
      "ProductWidth", "ProductHeight", "ProductLen", "ProductSizeUOM",
      "Vendor", "DefaultVendor", "VendorPartNumber", "Cost", "VendorUOM", "CFP-Custom"
    ],
    required: ["PartNumber", "PartTypeID", "Active", "ProductNumber", "ProductActive", "Vendor", "Cost"],
    defaults: {
      Active: "true",
      ProductActive: "true",
      ProductTaxable: "false",
      PartTypeID: "10", // Default to INVENTORY
      StdCost: "0",
      Price: "0",
      DefaultVendor: "true"
    },
    formats: {
      Active: ["true", "false"],
      ProductActive: ["true", "false"],
      ProductTaxable: ["true", "false"],
      PartTypeID: ["10", "20", "21", "22", "30", "40", "50", "60"],
      ProductSOItemTypeID: ["10", "12", "20"],
      Price: "numeric",
      StdCost: "numeric",
      Cost: "numeric"
    }
  };
  