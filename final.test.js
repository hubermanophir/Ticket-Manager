/**
 * @jest-environment node
 */
const request = require("supertest");
const full4s = require("@suvelocity/tester");
const app = require("./app");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const seed = require("./seeder");
const Ticket = require("./models/Ticket");
let mongoClient;
let DB;
let tickets;
let myId;

const connectToMongoDB = async () => {
  mongoClient = new MongoClient(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await mongoClient.connect();

    DB = mongoClient.db("TicketManagerTest");
    tickets = DB.collection("tickets");
    console.log("Connected to test DB successfully!");
  } catch (e) {
    console.log(e);
    mongoClient.close();
  }
};

const projectName = "1.Tickets manager backend";
describe(projectName, () => {
  jest.setTimeout(10000);
  beforeAll(async () => {
    await full4s.beforeAll();
    await connectToMongoDB();
    await seed(process.env.TEST_MONGO_URI);
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });
  afterEach(async () => {
    await full4s.afterEach();
  });
  afterAll(async () => {
    await full4s.afterAll(projectName);
    await mongoClient.close();
    await mongoose.connection.close();
    await app.close();
  });
  test("Can get all tickets", async () => {
    const { body } = await request(app).get("/api/tickets").expect(200);
    const allTickets = await tickets.find({}).toArray();
    expect(body.length).toBe(allTickets.length);
    expect(body[0]._id.toString()).toBe(allTickets[0]._id.toString());
  });

  test("Can get relevant tickets by searchText query param", async () => {
    const { body } = await request(app)
      .get("/api/tickets")
      .query({
        searchText: "full",
      })
      .expect(200);

    const expectedTicket = await tickets.findOne({
      title: { $regex: "full", $options: "i" },
    });

    expect(body.length).toBe(1);
    expect(body[0]._id.toString()).toBe(expectedTicket._id.toString());
  });

  test("Can mark ticket as done and undone", async () => {
    const firstTicket = await tickets.findOne({});
    const currentState = firstTicket.done;
    const { body } = await request(app)
      .patch(
        `/api/tickets/${firstTicket._id}/${currentState ? "undone" : "done"}`
      )
      .query({
        searchText: "full",
      })
      .expect(200);

    expect(body.updated).toBe(true);
    const updatedTicket = await tickets.findOne({});
    expect(updatedTicket.done).toBe(!currentState);

    const { body: undoneBody } = await request(app)
      .patch(
        `/api/tickets/${firstTicket._id}/${currentState ? "done" : "undone"}`
      )
      .query({
        searchText: "full",
      })
      .expect(200);

    expect(undoneBody.updated).toBe(true);
    const revertedTicket = await tickets.findOne({});
    expect(revertedTicket.done).toBe(currentState);
  });

  test("Can add a new ticket", async () => {
    const myTicket = {
      title: "test title",
      content: "test body",
      userEmail: "ofir@mail.com",
      done: false,
      labels: [1, 2, 3, 4],
    };
    const response = await request(app).post("/api/tickets").send(myTicket);
    const ticket = await Ticket.find({ title: "test title" });
    myId = ticket[0]._id;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ticket added");
    expect(ticket[0].title).toBe("test title");
  });

  test("Can delete a ticket", async (done) => {
    const response = await request(app).delete(`/api/tickets/${myId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Ticket deleted successfully" });
    const ticket = await Ticket.find({ title: "test title" });
    expect(ticket[0]).toBeUndefined();
    done();
  });
});
