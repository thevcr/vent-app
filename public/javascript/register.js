
const form = document.getElementById('Register');
form.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('Register_Username').value;
    const password = document.getElementById('Register_Password').value;
if(!username || !password) {
    badSignUp.textContent= "Please fill out all fields";
}
if (password.length <7) {
window.alert("Password Length must be at least 7 characters");
}

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      document.location.replace("/");
    } else {
     window.alert("Sorry something went wrong");
    }
  }
}
document.getElementById("Register_Button").addEventListener('submit', registerUser);

