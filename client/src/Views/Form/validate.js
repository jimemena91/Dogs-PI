const validate = (state, name, setErrors) => {
    switch (name) {
      case "name":
        if (state.name === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Campo requerido",
          }));
        } else if (state.name.length < 5) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "Debe tener al menos 5 caracteres",
          }));
        } else if (state.name.length > 10) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: "No debe superar los 10 caracteres",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        }
        break;

      case "image":
        const imgPattern = /^http(s)?:\/\/.+\..+/;
        if (state.image === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: "Campo requerido",
          }));
        } else if (!imgPattern.test(state.image)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: "URL de imagen inválida",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
        }
        break;

      case "height_min":
      case "height_max":
      case "weight_min":
      case "weight_max":
        const isDecimal = /^\d*\.?\d+$/; // Expresión regular para números decimales

        if (state[name] === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Campo requerido",
          }));
        } else if (!isDecimal.test(state[name])) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Debe ser un número decimal",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
        break;

      case "life_span_min":
      case "life_span_max":
        const isInteger = /^\d+$/; // Expresión regular para números enteros

        if (state[name] === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Campo requerido",
          }));
        } else if (!isInteger.test(state[name])) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Debe ser un número entero",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        }
        break;
      case "temperaments":
        if (state.temperaments.length === 0) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            temperaments: "Selecciona al menos un temperamento",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, temperaments: "" }));
        }
        break;
      default:
        break;
    }
  };

  