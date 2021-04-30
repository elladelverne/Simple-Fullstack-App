if (localStorage.getItem("userId") == "undefined" || localStorage.getItem("userId") == null) location.href = "/login.html"

const $reviewsContainer = document.getElementById("reviews")
const $usersContainer = document.getElementById("users")
document.getElementById("createReview")
    .onclick = createReview


spawnReviews()

//spawnUsers()

function createReview(e) {
    e.preventDefault()

    const payload = {
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
    }
    fetch("/reviews", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
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
             <p>${review.username}</p>
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
