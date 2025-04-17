export interface ValidationError {
    [key: string]: string; // e.g., "email": "Invalid email format"
  }
  
  export const validateRow = (row: any): ValidationError => {
    const errors: ValidationError = {};
  
    if (!row.name || row.name.trim() === '') {
      errors.name = 'Name is required';
    }
  
    if (!row.email || row.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(row.email)) {
      errors.email = 'Invalid email format';
    }
  
    return errors;
  };

  