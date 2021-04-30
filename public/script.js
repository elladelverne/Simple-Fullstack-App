if (localStorage.getItem("userId") == "undefined" || localStorage.getItem("userId") == null) location.href = "/login.html"

const $reviewsContainer = document.getElementById("reviews")
const $usersContainer = document.getElementById("users")
document.getElementById("createReview")
    .onclick = createReview


spawnReviews()

//spawnUsers()

function createReview(e) {
    e.preventDefault()

    fetch("/create", {
        body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            videogame: document.getElementById("videogame").value,
            publisher: document.getElementById("publisher").value,
            developer: document.getElementById("developer").value,
            genre: document.getElementById("genre").value,
            rate: document.getElementById("rating").value,
            reason: document.getElementById("newReview").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
        })
        .catch(err => console.error(err))
}

function spawnReviews() {
   fetch("/reviews")
    .then(res => res.json())
    .then(reviews => {
        const reviewsHTML = reviews.map( review => `
        <div class="row">
          <div class="col-sm-3">
            <div class="well" data-reviewid=${review.id}>
             <p>${review.user_id}</p>
             <img src="maleAvatar.PNG" class="img-circle" height="45" width="45" alt="Avatar">
            </div>
          </div>
          <div class="col-sm-9" >
            <div class="well">
              <p>
                Game:${review.videogame}<br>
                 Publisher: ${review.publisher}<br>
                 Developer: ${review.developer}<br>
                 Genre: ${review.genre}<br>
                 Rating: ${review.rate}/5</br>
                 Why: ${review.reason}
              </p>
              <button type="button" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-fire"></span> Enjoyed game
                <button type="button" class="btn btn-default btn-sm">
                    <span class="glyphicon glyphicon-thumbs-down"></span> Did not enjoy game
            </div>
          </div>
        </div>
        ` ).join("")
        $reviewsContainer.innerHTML = reviewsHTML
    })
    .catch(err => console.error(err))
   
}

function spawnUsers() {
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

function addFriend(e) {
    const $userDiv = e.target.parentElement
    const friend_id = $userDiv.userid

    const payload = {
        body: JSON.stringify({
            user_id: localStorage.getItem("userId"),
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
            
        ]
    }
}