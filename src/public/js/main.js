let avatar = document.querySelector('.ava')
let token = window.localStorage.getItem('token')
let navbarList = document.querySelector('.navbar-list')
let iframesList = document.querySelector('.iframes-list')
let backendApi = "http://localhost:5000"

async function renderUser() {
    let response = await fetch(backendApi +'/users')
    response = await response.json()
    console.log(response);
    for(let i of response) {
        let li = document.createElement('li')
        li.innerHTML = `
            <a href="#">
                <img src="${backendApi + i.userImg}" alt="channel-icon" width="30px" height="30px">
                <span>${i.username}</span>
            </a>
        `
        navbarList.append(li)
    }

}

async function videRender() {
    let videoResponse = await fetch(backendApi + '/videos')
    videoResponse = await videoResponse.json()
    console.log(videoResponse);
    for(let video of videoResponse) {
        let li = document.createElement('li')
        li.className = "iframe"
        li.innerHTML = `
            <video src="${backendApi + video}" controls=""></video>
            <div class="iframe-footer">
                <img src="https://cdn-icons-png.flaticon.com/512/146/146031.png" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h2 class="channel-name">Hikmat</h2>
                    <h3 class="iframe-title">Falonchiga otvet</h3>
                    <time class="uploaded-time">2020/02/08 | 15.24</time>
                    <a class="download" href="#">
                        <span>20 MB</span>
                        <img src="./img/download.png">
                    </a>
                </div>                  
            </div>      
        `
    }
}

renderUser()
videRender()