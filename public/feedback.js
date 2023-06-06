function validateForm() {
    // Validating the email using regular expression
    var emailInput = document.getElementById("email");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      alert("The email address is not valid.");
      emailInput.focus();
      return false;
    }
    
    // Checking if all fields are filled
    var nameInput = document.getElementById("name");
    var selectInput = document.getElementById("grade");
    var rangeInput = document.getElementById("satisfaction");
    var messageInput = document.getElementById("message");
    
    if (
      nameInput.value === "" ||
      selectInput.value === "" ||
      rangeInput.value === "" ||
      messageInput.value === ""
    ) {
      alert("All fields must be filled.");
      return false;
    }
    
    // Confirmation message for receiving the feedback
    alert("Thank you for your feedback!");
    return true;
  }