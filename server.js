require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// AWS DynamoDB setup
AWS.config.update({ region: process.env.AWS_REGION });
const dynamo = new AWS.DynamoDB.DocumentClient();

// Add a birthday
app.post("/birthday", async (req, res) => {
  const { name, dob } = req.body;
  if (!name || !dob) return res.status(400).json({ error: "Name and DOB required" });

  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Item: {
      id: uuidv4(),
      name,
      dob,
    },
  };

  try {
    await dynamo.put(params).promise();
    res.json({ message: "Birthday saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get upcoming birthdays
app.get("/birthday", async (req, res) => {
  const params = { TableName: process.env.DYNAMO_TABLE };

  try {
    const data = await dynamo.scan(params).promise();
    // Sort by date
    const sorted = data.Items.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
// Delete birthday
app.delete("/birthday/:id", async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Key: { id }
  };

  try {
    await dynamo.delete(params).promise();
    res.json({ message: "Birthday deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update birthday
app.put("/birthday/:id", async (req, res) => {
  const { id } = req.params;
  const { name, dob } = req.body;

  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Key: { id },
    UpdateExpression: "set #n = :n, dob = :d",
    ExpressionAttributeNames: { "#n": "name" },
    ExpressionAttributeValues: { ":n": name, ":d": dob },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    await dynamo.update(params).promise();
    res.json({ message: "Birthday updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
