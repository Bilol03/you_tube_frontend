let avatar = document.querySelector('.ava')
let token = window.localStorage.getItem('token')
let navbarList = document.querySelector('.navbar-list')
let iframesList = document.querySelector('.iframes-list')
let backendApi = "http://localhost:5000"

const profileImg = window.localStorage.getItem('userImg')
if(profileImg) {
	avatarImg.src = backendApi + profileImg
}

async function renderUser() {
    let response = await fetch(backendApi +'/users')
    response = await response.json()
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

    videoRender(response)

}

    async function videoRender(users, search) {

    let videoResponse = await fetch(backendApi + '/videos')
    videoResponse = await videoResponse.json()

    // const videos = await request(
	// 	'/videos' + 
	// 	(userId ? ('?userId=' + userId) : "") +
	// 	(search ? ('?search=' + search) : "")
	// )
    

	if(!search) {
		searchInput.value = null
	}

	if(!search) {
		datalist.innerHTML = null
		for(let video of videoResponse) {
			let option = document.createElement('option')
			option.value = video.videoTitle
			datalist.append(option)
		}
	}

    if(users) {
        for(let video of videoResponse) {
            const user = users.find(el => el.userId == video.userId)
            let li = document.createElement('li')
            li.className = "iframe"
            li.innerHTML = `
                <video src="${backendApi + video.videoUrl}" controls=""></video>
                <div class="iframe-footer">
                    <img src="${backendApi + user.userImg}" alt="channel-icon">
                    <div class="iframe-footer-text">
                        <h2 class="channel-name">${user.username}</h2>
                        <h3 class="iframe-title">${video.videoTitle}</h3>
                        <time class="uploaded-time">${video.videoUploadedDate}</time>
                        <a class="download" href="#">
                            <span>${video.videoSize}</span>
                            <img src="./img/download.png">
                        </a>
                    </div>                  
                </div>      
            `
    
            iframesList.append(li)
        }
    }
}


searchForm.onsubmit = event => {
	event.preventDefault()
	if(searchInput.value != "") {
		return videoRender(null, searchInput.value)
	}
}

renderUser()