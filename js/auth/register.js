import {
    aebackendURL,
    successNotification,
    errorNotification,
  } from "../utils/utils.js";
  

const url ="http://aebackend.test";
  // Form Register
  const form_register = document.getElementById("form_register");
  
  form_register.onsubmit = async (e) => {
    e.preventDefault();
 
    // Disable Button
    document.querySelector("#form_register button").disabled = true;
    
    // Get Values of Form (input, textarea, select) set it as form-data
    const formData = new FormData(form_register);
  
    // Fetch API User Register Endpoint
    const response = await fetch(aebackendURL + "/api/patient", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
  
    // Get response if 200-299 status code
    if (response.ok) {
      form_register.reset();
  
      successNotification("Successfully registered account.", 5);
    }
    // Get response if 422 status code
    else if (response.status == 422) {
      const json = await response.json();
  
      errorNotification(json.message, 5);
    }
  
    // Enable Button
    document.querySelector("#form_register button").disabled = false;
    document.querySelector("#form_register button").innerHTML = `Register`;
  };
  