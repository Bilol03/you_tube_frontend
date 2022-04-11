let backendApi = "http://localhost:5000"

const localStorage = window.localStorage.getItem("token")
if(!localStorage) window.location = '/login'
headers = {
    token : localStorage
}

;(async () => {
    let response = await fetch(backendApi + "/validateToken", {
        headers
    })
    
    if(response.status == 401) {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("userImg")
        window.location = '/login'
        alert("Token is invalid")
    }
})()



