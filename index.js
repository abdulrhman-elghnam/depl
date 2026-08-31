import express from "express"
import mongo from "mongodb"

const app = express()
app.use(express.json());

const getData = async () => {
    return {
        name : "ahmed"
    }
}

const connection = new  mongo.MongoClient("mongodb+srv://zjr8oo:NAwpwq6xeJKenHmr@cluster0.dhgpzld.mongodb.net/?appName=Cluster0")



app.listen(3000, async () => {
    await connection.connect().then(()=>{
        console.log("connected ");
    });
    console.log("server is running on port 3000");
})

const databaseName = connection.db("test");

app.get("/", (req, res, next) => {
    res.status(200).json({ msg: "hi from backed side " })
})



app.post("/user", async (req, res, next) => {
   try {
     const serviceFeedback = await databaseName.collection("user").insertOne(req.body)
    console.log(serviceFeedback);
    return res.status(200).json({ msg: "inserted", data: serviceFeedback })
   } catch (error) {
    console.log(error);
   }
})

app.get("/user/:username", async (req, res, next) => {
    const serviceFeedback = await databaseName.collection("user").findOne({name:req.params.username})
    console.log(serviceFeedback);
    return res.status(200).json({ msg: "done", data: serviceFeedback })
})