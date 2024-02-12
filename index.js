// UI-Elements
let postBtnEl = document.getElementById('postbtn')
let textboxEl = document.getElementById('textbox')
let imageEl = document.getElementById('image')
let postsEl = document.getElementById('posts')
let heartEl = document.getElementById('heart')

let posts = []
let countheart = 0
let countcomment = 0

// Interactivity

document.addEventListener('click' ,(e) => {
    if(e.target.id == 'heart'){
        console.log('heart clicked')
        countheart++
        document.getElementById('babes').textContent = `${countheart}`
    }
})

postBtnEl.addEventListener('click', () => {
   if(textboxEl.value && imageEl.value){
     getPosts()
     render()
     clearFeed()
   }else{
    alert('fill all the inputs')
   }
})

function getPosts(){
    posts.unshift({
        img:URL.createObjectURL(imageEl.files[0]),
        countheart:0,
        countcomment:0,
        text:textboxEl.value
    })
    console.log(posts)
    // postsEl.innerHTML += `<div class="Post">
    //                         <img src="${URL.createObjectURL(imageEl.files[0])}" width="380px" height="390px" style="object-fit: cover; margin-top: 1em;">
    //                         <div class="interactions">
    //                             <div class="score">
    //                                 <i class="fa-regular fa-heart icons" id="heart"></i>
    //                                 <h2 id="babes">${countheart}</h2>
    //                             </div>
    //                             <div class="score comment">
    //                                 <i class="fa-regular fa-comment icons"></i>
    //                                 <h2>${countcomment}</h2>
    //                             </div>
    //                         </div>
    //                         <h3>${textboxEl.value}</h3>
    //                       </div>`
}

function clearFeed(){
    textboxEl.value = ''
    imageEl.value = ''
}

function getFeed(){
    let feedHtml = ''
    posts.forEach((item) => {
        feedHtml += `<div class="Post">
                       <img src="${item.img}" width="380px" height="390px" style="object-fit: cover; margin-top: 1em;">
                        <div class="interactions">
                            <div class="score">
                                <i class="fa-regular fa-heart icons" id="heart"></i>
                                <h2 id="babes">${item.countheart}</h2>
                            </div>
                            <div class="score comment">
                                <i class="fa-regular fa-comment icons"></i>
                                <h2>${item.countcomment}</h2>
                            </div>
                        </div>
                        <h3>${item.text}</h3>
                    </div>`
    })
    return feedHtml
}

function render(){
    postsEl.innerHTML = getFeed()
}