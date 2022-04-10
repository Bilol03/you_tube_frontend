let backendApi = "http://localhost:5000" 
let username = document.querySelector('#usernameInput') 
let password = document.querySelector('#passwordInput')
const form = document.querySelector(".site-form")

form.onsubmit = async el => {
    el.preventDefault()
    try {
        let response = await fetch(backendApi + '/login', {
            method: 'POST', 
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        response = await response.json()
        console.log(response);
        if(response.token) {
            window.localStorage.setItem("token", response.token)
        }

        window.location = '/admin'
    } catch (error) {
        console.log(error.message)
    }

}