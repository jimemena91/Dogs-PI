// Archivo: ValidationUtils.js
const isDecimal = /^\d*\.?\d+$/;
const isInteger = /^\d+$/;

export const validateName = (name) => {
  if (name === "") {
    return "Campo requerido";
  } else if (name.length < 5) {
    return "Debe tener al menos 5 caracteres";
  } else if (name.length > 10) {
    return "No debe superar los 10 caracteres";
  }
  return "";
};

export const validateImage = (image) => {
  const imgPattern = /^http(s)?:\/\/.+\..+/;
  if (image === "") {
    return "Campo requerido";
  } else if (!imgPattern.test(image)) {
    return "URL de imagen inválida";
  }
  return "";
};

export const validateDecimal = (value, fieldName) => {
  if (value === "") {
    return `${fieldName} requerido`;
  } else if (!isDecimal.test(value)) {
    return `Debe ser un número decimal para ${fieldName}`;
  }
  return "";
};

export const validateInteger = (value, fieldName) => {
  if (value === "") {
    return `${fieldName} requerido`;
  } else if (!isInteger.test(value)) {
    return `Debe ser un número entero para ${fieldName}`;
  }
  return "";
};

export const validateTemperaments = (temperaments) => {
  if (temperaments.length === 0) {
    return "Selecciona al menos un temperamento";
  }
  return "";
};
