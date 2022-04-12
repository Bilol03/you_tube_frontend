let backendApi = "http://192.168.0.15:5000"
const videosList = document.querySelector('.videos-list')
const p = document.querySelector('.content')

const localStorage = window.localStorage.getItem("token")
const userId = window.localStorage.getItem("userImg")
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



submitButton.onclick = async el => {
    el.preventDefault()
    let formData = new FormData()

    formData.append("videoTitle",videoInput.value)
    formData.append("videoUrl", uploadInput.files[0])
    formData.append("userId", userId)

    await fetch(backendApi + "/videos", {
        method: "POST",
        body: formData
    })
    videoInput.value = null
    renderVideo()
}

async function renderVideo() {
    videosList.innerHTML = null
    let response = await fetch(backendApi + '/videos')
    response = await response.json()
    for(let video of response) {
        if(video.userId == userId){
            let li = document.createElement('li')
            li.className = "video-item"

            let videoTag = document.createElement("video")
            videoTag.src = backendApi + video.videoUrl
            videoTag.controls = true

            let p = document.createElement('p')
            p.className = "content"
            p.textContent = video.videoTitle
            p.contentEditable = true
            p.setAttribute("data-id", "2")

            let img = document.createElement("img")
            img.src = "./img/delete.png"
            img.width = 25
            img.className = "delete-icon"

            p.onkeyup = async el => {
                el.preventDefault()
                if(el.keyCode == 13) {
                    p.blur()
                    let response = fetch(backendApi + '/videos', {
                        method: 'PUT',
                        body: JSON.stringify({
                          videoId: video.videoId,
                          videoTitle: p.textContent
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                }
            }

            img.onclick = async el => {
                el.preventDefault()
                let response = fetch(backendApi + '/videos', {
                    method: 'DELETE',
                    body: JSON.stringify({
                      videoId: video.videoId,
                    }),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                videosList.removeChild(li)
            }

            li.append(videoTag, p, img)
            videosList.append(li)
        }
    }
}



renderVideo()



