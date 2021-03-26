const express = require('express')
const sqlite3 = require('sqlite3')
const app = new express()
const db = new sqlite3.Database('./db/gamepage.db')
const reviews = loadData().reviews

app.use(express.static('public'))
app.use(express.json())

app.get("/reviews", (req,res) => {
    const sql = "SELECT * FROM reviews;"
    db.all(sql,[],(err, rows) => {
        res.send(rows)
    })
})

app.get("/users", (req,res) => {
    const sql = "SELECT * FROM users"
    db.all(sql,[],(err, rows) => {
        res.send(rows)
    })
})

app.post("/friends", (req, res) => {
    const friendship = req.body
    const sql = "INSERT INTO users_users (userid1, userid2) VALUES (?,?)"
    db.run(sql,[friendship.user_id, friendship.friend_id],(err) => {
        if (err) console.error(err)
        res.send({
            message: "You are now friends!",
            friendshipID: this.lastID
        })
    })
})

app.post("/reviews", (req,res)=> {
    const review = req.body;
    if (review.text.length >= 5) {
        const sql = "INSERT INTO reviews (videogame, publisher, developer, genre, rate, reason, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);"
        db.run(sql,[review.videogame, review.publisher, review.developer, review.genre, review.rate, review.text, 0])
        res.send({
            message: "Review successfully saved"
        })
    }
    else {
        res.send({
            message: "Review is not long enough."
        })
    }
})

app.post("/login", (req, res) => {
    const user = req.body
    const sql2 = "SELECT id, first_name, last_name FROM users WHERE username = ? AND password = ?"
    db.all(sql2,[user.username, user.password],(err, rows) => {
        if (rows && rows.length > 0) {
            res.send({
                message: "Successful login!",
                user: rows[0]
            })
        }
    
    else {
        if (user.username.length >= 4 && user.password.length >= 4) {
            const sql = "INSERT INTO users (username, password, first_name, last_name) VALUES (?,?,?,?)"
            db.run(sql,[user.username, user.password, user.firstName, user.lastName],(err) => {
                if (err) console.error(err)
                res.send({
                    message: "Your account was successfully created.",
                    userId: this.lastID
                })
            })
        }
        else {
            res.status(401)
            res.send({
                message: "Username or password is invalid."
            })
        }
    }
    })
})

app.listen(3000, () => console.log("Server started"))

function loadData() {
    return {
        users:
        [
            {
                id: 1,
                username: "jword",
                password: "hello2021"
            },
            {
                id: 2,
                username: "tommyinnit",
                password: "blockgame"
            },
            {
                id: 3,
                username: "joel15",
                password: "kirby"
            }
        ]
    }
}