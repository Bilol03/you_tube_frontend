let avatar = document.querySelector('.ava')
let token = window.localStorage.getItem('token')
let navbarList = document.querySelector('.navbar-list')
let iframesList = document.querySelector('.iframes-list')
let backendApi = "http://192.168.0.15:5000"

const profileImg = window.localStorage.getItem('userImg')

// avatar render

async function renderAvatar() {
    let response = await fetch(backendApi + '/users')
    response = await response.json()

    let user = response.find(el => el.userId == profileImg)
    if(profileImg) {
        avatarImg.src = backendApi + user.userImg
    }
}

// video render

async function videoRender(users, videos, search) {
    iframesList.innerHTML = null

    let videoResponse = await fetch(backendApi + '/videos')
    videoResponse = await videoResponse.json()

	if(!search) {
		datalist.innerHTML = null
		for(let video of videoResponse) {
			let option = document.createElement('option')
			option.value = video.videoTitle
			datalist.append(option)
		}
	}

    if(users && videos != null) {
        for(let video of videos ? videos : videoResponse) {
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

// user render


async function renderUser() {

    let response = await fetch(backendApi +'/users')
    response = await response.json()

    let videoResponse = await fetch(backendApi + '/videos')
    videoResponse = await videoResponse.json()

    for(let i of response) {
        let li = document.createElement('li')
        li.innerHTML = `
            <a href="#">
                <img src="${backendApi + i.userImg}" alt="channel-icon" width="30px" height="30px">
                <span>${i.username}</span>
            </a>
        `
        li.onclick = el => {
            el.preventDefault()
            let video = videoResponse.filter(el => el.userId == i.userId)
            if(video) {
                videoRender(response, video, searchInput.value)
            }
        }
        navbarList.append(li)
    }

    videoRender(response, videoResponse )

}


// searchform

searchForm.onsubmit = async el => {
    el.preventDefault()

    let videoResponse = await fetch(backendApi + '/videos')
    videoResponse = await videoResponse.json()

    let response = await fetch(backendApi +'/users')
    response = await response.json()

    let videos = await fetch(backendApi + '/videos')
    videos = await videos.json()

    let video = videos.filter(el => el.videoTitle.includes(searchInput.value))
    if(video) {
        videoRender(response, video, searchInput.value)
    }
}

// voice searchform

voiceBtn.onclick = () => {
	const voice = new webkitSpeechRecognition()
	voice.lang = 'uz-UZ'

	voice.start()

	voice.onresult = (event) => {
		searchInput.value = event.results[0][0].transcript
		videoRender(null, event.results[0][0].transcript)
	}

	voice.onaudioend = () => {
		voice.stop()
	}
}


renderAvatar()
renderUser()