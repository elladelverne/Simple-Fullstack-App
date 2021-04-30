const express = require('express')
const sqlite3 = require('sqlite3')
const app = new express()
const db = new sqlite3.Database('./db/gamepage.db')


app.use(express.static('public'))
app.use(express.json())

app.get("/reviews", (req,res) => {
    const sql = "SELECT * FROM reviews"
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
    const sql = "INSERT INTO reviews (videogame, publisher, developer, genre, rate, reason, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
    db.run(sql,[review.videogame, review.publisher, review.developer, review.genre, review.rate, review.reason, review.userId], (err) => {
        if (err) console.error(err)
        res.send({
            message: "Review successfully saved"
        })
    })
})

app.post("/login", (req, res) => {
    const user = req.body
    const sql2 = "SELECT id, first_name, last_name FROM users WHERE username = ? AND password = ?"
    db.all(sql2,[user.username, user.password],(err, rows) => {
        if (rows && rows.length > 0) {
            res.send({
                message: "Successful login!",
                userId: rows[0].id
            })
        }
    
    else {
        if (user.username.length >= 4 && user.password.length >= 4) {
            const sql = "INSERT INTO users (username, password) VALUES (?,?)"
            db.run(sql,[user.username, user.password],(err) => {
                if (err) console.error(err)
                const idSQL = "SELECT id FROM users WHERE username = ?"
                db.get(idSQL, [user.username], (err, row) => {
                    if (err) console.error(err)
                    if (row) res.send({
                        message: "Your account was successfully created.",
                        userId: row.id
                    })
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
