import { useState } from "react";

// Custom Hook para poder reutilizar la logica que tiene en 'RegisterPage' y 'LoginPage'
// Donde el objeto que se envia es dinamico a traves de 'initialState'
const useForm = (initialState) => {
  // Estado que va a guardar los datos de registro. Va a ser manejado como un objeto
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = (e) => {
    // Desestructura del objeto el value y el name del input
    const { name, value } = e.target;
    // console.log({ name, value });

    // Actualizar el estado (que es un objeto) de forma dinamica sin saber su propiedad usando 'computerProperties'
    setFormValues({
      ...formValues, // obtiene todo lo que tiene formValues
      [name]: value,
    });
  };

  // lo que retorna
  return {
    formValues, // para hacer matchs de los inputs de los formularios
    handleInputChange, // para la actualizacion de los campos
  };
};

export default useForm;
