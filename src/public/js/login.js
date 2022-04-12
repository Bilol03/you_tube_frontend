let backendApi = "http://192.168.0.15:5000" 
let username = document.querySelector('#usernameInput') 
let password = document.querySelector('#passwordInput')
const form = document.querySelector(".site-form")

const token = window.localStorage.getItem("token")
const userId = window.localStorage.getItem("token")
if(localStorage) window.location = '/admin'

form.onsubmit = async el => {
    el.preventDefault()
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
    
    if(response.status == 400) {
        alert("Siz noto'g'ri ma'lumot kiritgansiz")
    }

    if(response.token) {
        window.localStorage.setItem("token", response.token)
        window.localStorage.setItem("userImg", response.img)
    }
    window.location = '/admin'
}