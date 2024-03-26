import './App.css'
import FormContext from "./providers/FormContext.jsx";
import {useState} from "react";
import Form from "./form/Form.jsx";

function App() {
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });
  const [formError, setFormError] = useState({
      email: '',
      password: ''
  });
  return (
    <FormContext.Provider value={{formData, setFormData, formError, setFormError}}>
      <Form />
    </FormContext.Provider>
  )
}

export default App
