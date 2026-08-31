import express from "express"

const app = express()

const getData = async () => {
    return {
        name : "ahmed"
    }

}

app.listen(3000, () => {
    console.log("server is running on port 3000");
})

app.get("/", (req, res, next) => {
    res.status(200).json({ msg: "hi from backed side " })
})


app.get("/user", async (req, res, next) => {

    const serviceFeedback = await getData()
    console.log(serviceFeedback);
    return res.status(200).json({ msg: "done", data: serviceFeedback })
})