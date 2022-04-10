const backendApi = 'http://localhost:5000'

let customUpload = document.querySelector('#uploadInput')
let username = document.querySelector('#usernameInput') 
let password = document.querySelector('#passwordInput')
const showButton = document.querySelector('.zmdi-eye') 

submitButton.onclick = async el => {
    el.preventDefault()
    let formData = new FormData()

    formData.append('username', username.value)
    formData.append('password', password.value)
    formData.append('userImg', customUpload.files[0])

    let response = await fetch(backendApi + "/register", {
        method: "POST",
        body: formData
    })

    
    response = await response.json()
    if(response.token) {
        window.localStorage.setItem('token', response.token)
        alert(response.message)
    }
    

    usernameInput.value = null
    passwordInput.value = null

    window.location = '/admin'

}


showButton.onclick = () => {
    if(passwordInput.type == 'password') {
        return passwordInput.type = 'text'
    }

    if(passwordInput.type == 'text') {
        return passwordInput.type = 'password'
    }
}