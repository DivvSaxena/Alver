//Setting up the Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref as reference ,push , onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getStorage, ref , uploadBytes, getDownloadURL   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

// UI-Elements
let postBtnEl = document.getElementById('postbtn')
let textboxEl = document.getElementById('textbox')
let imageEl = document.getElementById('image')
let postsEl = document.getElementById('posts')
let heartEl = document.getElementById('heart')
let loggedInViewEl = document.getElementById('loggedInView')
let loggedOutViewEl = document.getElementById('loggedOutView')
let emailInputEl = document.getElementById('email-input')
let passwordInputEl = document.getElementById('password-input')

const signInButtonEl = document.getElementById('sign-in-btn')
const createAccountButtonEl = document.getElementById('create-account-btn')



const signInWithGoogleBtnEl = document.getElementById('sign-in-with-google')


let posts = []
let countheart = 0
let countcomment = 0


const firebaseConfig = {
    apiKey: "AIzaSyBvrn8tzHjw3EJmXE60CvKTA9hJ_AhutSI",
    authDomain: "alver-b87eb.firebaseapp.com",
    databaseURL: "https://alver-b87eb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "alver-b87eb",
    storageBucket: "alver-b87eb.appspot.com",
    messagingSenderId: "1098208105117",
    appId: "1:1098208105117:web:d09d023cf808c4c9a8fa74"
  };

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const postsListInDB = reference(database,"texts")

// for images
const storage = getStorage()
const storageRef = ref(storage)
const imagesRef = ref(storage, 'images')

/* === Event Listeners === */

signInButtonEl.addEventListener('click', authSignInWithEmail)
createAccountButtonEl.addEventListener('click', authCreateAccountWithEmail)

signInWithGoogleBtnEl.addEventListener('click', authSignUpWithGoogle)


//Auth
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
    } else {
      showLoggedOutView()
    }
  });

  function authSignUpWithGoogle(){
    signInWithPopup(auth, provider)
  .then((result) => {
    console.log('Sign in With Google')
  }).catch((error) => {
     alert(error.message)
  })
}

function authSignInWithEmail(){

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        alert(error.message)
    })
}

function authCreateAccountWithEmail(){

    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        alert(error.message)
    })
}

function clearAuthFields(){
    emailInputEl.value = ''
    passwordInputEl.value = ''
}





// Interactivity

document.addEventListener('click' ,(e) => {
    if(e.target.id == 'heart'){
        console.log('heart clicked')
        countheart++
        document.getElementById('babes').textContent = `${countheart}`
    }
})

postBtnEl.addEventListener('click', async () => {
    if(textboxEl.value && imageEl.value){
        let sparkyRef = ref(storage, `images/${textboxEl.value}`)

        try{
            const snapshot = await uploadBytes(sparkyRef, imageEl.files[0])

            const url = await getDownloadURL(sparkyRef)
            
            const item = {
                        img:`${url}`,
                        countheart:0,
                        countcomment:0,
                        text:`${textboxEl.value}`
                    }

            push(postsListInDB, item)
        
            clearFeed()
        }
        catch (error){
            console.error('Error uploading file to Firebase:', error);

        } 
     
   }else{
    alert('fill all the inputs')
   }
})

async function getPosts(){
    posts.unshift({
        img:URL.createObjectURL(imageEl.files[0]),
        countheart:0,
        countcomment:0,
        text:textboxEl.value
    })

    


}

onValue(postsListInDB, (snapshot) => {
    let itemArray = Object.entries(snapshot.val())
    let feedHtml = ''

    for (let i = itemArray.length - 1; i >= 0; i--) {
        let currentItem = itemArray[i][1]; // Access the item from the array
        feedHtml += getFeed(currentItem);
    }
    
    render(feedHtml)
})

function clearFeed(){
    textboxEl.value = ''
    imageEl.value = ''
}

function getFeed(item){
    // let feedHtml = ''
    // posts.forEach((item) => {
    //     feedHtml += `<div class="Post">
    //                    <img src="${item.img}" width="380px" height="390px" style="object-fit: cover; margin-top: 1em;">
    //                     <div class="interactions">
    //                         <div class="score">
    //                             <i class="fa-regular fa-heart icons" id="heart"></i>
    //                             <h2 id="babes">${item.countheart}</h2>
    //                         </div>
    //                         <div class="score comment">
    //                             <i class="fa-regular fa-comment icons"></i>
    //                             <h2>${item.countcomment}</h2>
    //                         </div>
    //                     </div>
    //                     <h3>${item.text}</h3>
    //                 </div>`
    // })
    return `<div class="Post">
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
                <h3 class="image-description">${item.text}</h3>
            </div>`
}

function render(feedHtml){
    postsEl.innerHTML = feedHtml
}

function showLoggedOutView(){
    hideView(loggedInViewEl)
    showView(loggedOutViewEl)
}

function showLoggedInView(){
    hideView(loggedOutViewEl)
    showView(loggedInViewEl)
}

function showView(view){
    view.style.display = 'flex'
}

function hideView(view){
    view.style.display = 'none'
}
