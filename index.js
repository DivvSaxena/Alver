// UI-Elements
let postBtnEl = document.getElementById('postbtn')
let textboxEl = document.getElementById('textbox')
let imageEl = document.getElementById('image')
let postsEl = document.getElementById('posts')

let posts = []

// Interactivity
postBtnEl.addEventListener('click', () => {
   if(textboxEl.value && imageEl.value){
     getPosts()
     clearFeed()
   }else{
    alert('fill all the inputs')
   }
})

function getPosts(){
    postsEl.innerHTML += `<div class="Post">
                            <img src="${URL.createObjectURL(imageEl.files[0])}" width="380px" height="390px" style="object-fit: cover; margin-top: 1em;">
                            <div class="interactions">
                                <div class="score">
                                    <i class="fa-regular fa-heart icons"></i>
                                    <h2>5</h2>
                                </div>
                                <div class="score comment">
                                    <i class="fa-regular fa-comment icons"></i>
                                    <h2>4</h2>
                                </div>
                            </div>
                            <h3>${textboxEl.value}</h3>
                          </div>`
}

function clearFeed(){
    textboxEl.value = ''
    imageEl.value = ''
}