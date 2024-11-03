// Wait until the DOM is fully loaded before executing
document.addEventListener('DOMContentLoaded', () => {

  // Toggle between sign-in and sign-up mode
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });

  // Sign-in form submission
  document.querySelector(".sign-in-form").addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const username = document.querySelector(".sign-in-form input[type='text']").value;
    const password = document.querySelector(".sign-in-form input[type='password']").value;

    // Dummy login logic for demo purposes
    if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
      alert('Login successful!');
      // Redirect to stats dashboard page
      window.location.href = 'pages/stats.html';
    } else {
      alert('Invalid username or password');
    }
  });

  // Sign-up form submission
  document.querySelector(".sign-up-form").addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const username = document.querySelector(".sign-up-form input[type='text']").value;
    const email = document.querySelector(".sign-up-form input[type='email']").value;
    const password = document.querySelector(".sign-up-form input[type='password']").value;
    const gitUsername = document.querySelector(".sign-up-form input[type='text'][placeholder='Git Username']").value; // Git Username


    if (username === '' || email === '' || password === '' || gitUsername === '') {
      alert('Please fill in all fields');
      return;
    }
    function isValidEmail(email) {
      // Regular expression for stricter email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      // Check for the basic format
      if (!emailRegex.test(email)) {
          return false;
      }
  
      // Split the email into local part and domain part
      const [localPart, domainPart] = email.split('@');
  
      // Ensure local part and domain part exist and aren't too long
      if (localPart.length > 64 || domainPart.length > 255) {
          return false;
      }
  
      // Ensure domain part has a valid format
      const domainParts = domainPart.split('.');
      if (domainParts.some(part => part.length > 63)) {
          return false;
      }
  
      // Additional checks for edge cases
      if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
          return false;
      }
  
      return true;
  }
  
  
    // Function to validate username format
    function validateUsername(username) {
      // Ensure the username is 3-20 characters long, alphanumeric, and contains at least one letter
      const usernamePattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/;
      return usernamePattern.test(username);
    }
    

    if (!validateUsername(username)) {
      alert('Please enter a valid username (3-20 alphanumeric characters).');
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Dummy signup logic for demo purposes
    localStorage.setItem('username', username);
    localStorage.setItem('gitUsername', gitUsername);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('isLoggedIn', 'true');
    alert('Signup successful!');
    // Redirect to dashboard page
    window.location.href = 'index.html';
  });

  // Toggle password visibility for sign-up form
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    const togglePassword = form.querySelector('#toggle-password');
    const passwordInput = form.querySelector('#password-input');
  
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.classList.add('fa-lock-open');
        togglePassword.classList.remove('fa-lock');
      } else {
        passwordInput.type = 'password';
        togglePassword.classList.add('fa-lock');
        togglePassword.classList.remove('fa-lock-open');
      }
    });
  });

  // Check password strength for sign-up form
  function checkPasswordStrength() {
    const password = document.querySelector(".sign-up-form input[type='password']").value;
    const strengthWeak = document.getElementById('strength-weak');
    const strengthMedium = document.getElementById('strength-medium');
    const strengthStrong = document.getElementById('strength-strong');

    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    // Reset classes
    strengthWeak.className = '';
    strengthMedium.className = '';
    strengthStrong.className = '';

    // Apply strength classes based on criteria
    if (strength >= 1) strengthWeak.className = 'weak';
    if (strength >= 3) strengthMedium.className = 'medium';
    if (strength >= 5) strengthStrong.className = 'strong';
  }

  // Monitor password input on the sign-up form to check password strength
  document.querySelector(".sign-up-form input[type='password']").addEventListener('input', checkPasswordStrength);

});



