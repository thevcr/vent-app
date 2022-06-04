async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById("").value.trim();
    const email = document.getElementById("").value.trim();
    const password = document.getElementById("").value.trim();
  
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
  
  document.getElementById("").addEventListener('submit', signupFormHandler);