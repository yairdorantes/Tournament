import { createContext, useState } from "react";
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  //   const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const contextData = {
    // isOpenAuth,
    formData,
    setFormData,
  };

  return (
    <FormContext.Provider value={contextData}>{children}</FormContext.Provider>
  );
};

export default FormContext;
