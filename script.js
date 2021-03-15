//2. User can create new post, send to server
const $postsContainer = document.getElementById("posts")
//1.1 js reference to the section element with id users
const $usersContainer = document.getElementById("users")
document.getElementById("login")
    .onsubmit = login
//2.1 Set createPost function as onsubmit handler for the create post form 
document.getElementById("createPost")
    .onsubmit = createPost

spawnPosts()
//1.4 call function to spawn user elements
spawnUsers()
//2.2 Define function createPost to send post to server
let user_id

function createPost(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            text: document.getElementById("newPost").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/posts", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

function login(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => {
            user_id = res.userId
        })
        .catch(error => console.error(error))
}

function spawnPosts() {
   //GET posts from server
   fetch("/posts")
    .then(res => res.json())
    .then(posts => {
        const postsHTML = posts.map( post => `
        <div class="post">
            <p>${post.content}</p>
            <div class="details">
                <div>${post.userid}</div>
            </div>
        </div>
        ` ).join("")
        $postsContainer.innerHTML = postsHTML
    })
    .catch(err => console.error(err))
   
}

//1.2 define a function to spawn user elements
//4.2 update spawnUsers to pull from server
function spawnUsers() {
    //GET posts from server
    fetch("/users")
     .then(res => res.json())
     .then(users => {
         const usersHTML = users.map( user => `
         <div class="user" data-userid=${user.id}>
             <p>${user.username}</p>
             <div class="details">
                 <div>${user.firstName}</div>
             </div>
             <button onclick="e => {addFriend(e);}">Add Friend</button>
         </div>
         ` ).join("")
         $usersContainer.innerHTML = usersHTML
     })
     .catch(err => console.error(err))
    
 }
//1.3 each user element should be a div that shows user info
//... and has a button that says Add Friend (doesn't work)

//5. add Friend button works
function addFriend(e) {
    const $userDiv = e.target.parentElement
    const friend_id = $userDiv.userid

    const payload = {
        body: JSON.stringify({
            user_id: user_id,
            friend_id: friend_id
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/friends", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

function loadData() {
    return {
        posts: [
            {
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            },
            {
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            },
            {
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            },
            {
                text: "I got a new dog last night! It's so cute!",
                user: "kimmy23",
                datetime: new Date(),
                numLikes: 3,
                comments: []
            }
        ],
        users: [
            {
                username: "kimmy23",
                firstName: "Kimberly",
                lastName: "Bash",
                gender: "F",
                age: 45
            },
            {
                username: "wordup",
                firstName: "John",
                lastName: "Word",
                gender: "M",
                age: 31
            },
            {
                username: "dogguy23",
                firstName: "Rob",
                lastName: "Obeneur",
                gender: "M",
                age: 62
            },
            {
                username: "silentninja84",
                firstName: "Lesa",
                lastName: "Kirkland",
                gender: "F",
                age: 17
            }
        ]
    }
}