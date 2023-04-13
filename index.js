const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// User: dbUser2
// Passwrod: TlhrEtrVWEGGLO2B

const uri =
	"mongodb+srv://dbUser2:emCv26bCuWGESfdB@programmingherocluster.fdfar9q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

//Async Function
async function run() {
	try {
		const userCollectoin = client.db("nodeMongoCurd").collection("dataStorage");
		app.get("/users", async (req, res) => {
			const query = {};
			const cursor = userCollectoin.find(query);
			const user = await cursor.toArray();
			res.send(user);
		});
		app.get("/users/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await userCollectoin.findOne(query);
			res.send(result);
		});
		app.post("/users", async (req, res) => {
			const user = req.body;
			console.log(user);
			const result = await userCollectoin.insertOne(user);
			res.send(result);
		});
		app.put("/users/:id", async (req, res) => {
			const id = req.params.id;
			const firter = { _id: ObjectId(id) };
			const user = req.body;
			const option = { upsert: true };
			const updateUser = {
				$set: {
					name: user.name,
					address: user.address,
					email: user.email,
				},
			};
			const result = await userCollectoin.updateOne(firter, updateUser, option);
			res.send(result);
		});
		app.delete("/users/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			// console.log("trying to delete ", id);
			const result = await userCollectoin.deleteOne(query);
			res.send(result);
		});
	} finally {
	}
}
run().catch((error) => {
	console.log(error);
});

app.get("/", (req, res) => {
	res.send("Hello from node mongodb curd");
});

app.listen(port, () => {
	console.log(`Listen form port ${port}`);
});
