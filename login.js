
//Logging In
async function loginForm(event) {
    event.preventDefault();

        const email = document.getElementById().value.trim();
        const password = document.getElementById().value.trim();

        if (email && password) {
            const response = await fetch("/api/user-routes", {
                method: "post",
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
        }
}