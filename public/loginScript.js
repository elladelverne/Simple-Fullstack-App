document.getElementById("login")
    .onsubmit = login


function login(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem("userId", res.userId)
            location.href = "/"
        })
        .catch(error => console.error(error))
}
