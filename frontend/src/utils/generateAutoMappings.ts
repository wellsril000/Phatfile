export function generateAutoMappings(
    rawHeaders: string[],
    templateHeaders: string[]
  ): Record<string, string> {
    const mappings: Record<string, string> = {};
    const usedRawHeaders: Set<string> = new Set();
  
    templateHeaders.forEach((template) => {
      const cleanedTemplate = template.toLowerCase().replace(/[^a-z0-9]/gi, "");
  
      // Try to find the best raw header match
      const match = rawHeaders.find((raw) => {
        const cleanedRaw = raw.toLowerCase().replace(/[^a-z0-9]/gi, "");
  
        return (
          !usedRawHeaders.has(raw) && (
            cleanedRaw === cleanedTemplate ||                     // exact match
            cleanedRaw.includes(cleanedTemplate) ||               // raw contains template
            cleanedTemplate.includes(cleanedRaw)                  // template contains raw
          )
        );
      });
  
      if (match) {
        mappings[template] = match;
        usedRawHeaders.add(match);
      }
    });
  
    return mappings;
  }
  