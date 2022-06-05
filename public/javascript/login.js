async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById("Username_Login").value.trim();
    const password = document.getElementById("Login_Password").value.trim();
  
    if (username && password) {
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
    if (response.ok) {
      console.log('success');
    } else {
      alert(response.statusText);
    }
    }
  }
  
  document.getElementById("Login_Button").addEventListener('submit', signupFormHandler);