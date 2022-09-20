import request from "supertest";
import app from "../src/app";
import { routes } from "../src/hateoas/routes";
import {
  prepareDB,
  user1,
  user2,
  channel1,
  channel2,
  removeTestingEntities,
  idOfuser1,
  idOfChannel2,
  addChannelsToUserOne,
} from "../src/db/prepareTestingEnv";

describe("Testing hateoas ", () => {
  beforeAll(async () => {
    await prepareDB();
  });
  afterAll(async () => {
    await removeTestingEntities();
  });

  test("when users added we should be able to retrieve their list and got proper hateoas links", async () => {
    const response = await request(app).get("/users");
    expect(response.body.users).toStrictEqual([user1, user2]);
    expect(response.body._links).toStrictEqual(routes["/users/"]);
  });
  test("after request send for specific user, we should get user details in response and proper hateoas links", async () => {
    const response = await request(app).get("/users/" + idOfuser1);
    expect(response.body.user).toStrictEqual(user1);
    expect(response.body._links).toStrictEqual(routes["/users/:id"]);
  });
  test("when added channel to the user, channels should be on the list and proper hateoas links should be in response", async () => {
    await addChannelsToUserOne();
    const response = await request(app).get(`/users/${idOfuser1}/channels`);
    expect(response.body.channels).toContainEqual(channel1);
    expect(response.body.channels).toContainEqual(channel2);
    expect(response.body._links).toStrictEqual(routes[`/users/:id/channels/`]);
  });
  test("another step deeper into structure, we should get proper response after requesting single channel", async () => {
    const response = await request(app).get(
      `/users/${idOfuser1}/channels/${idOfChannel2}`
    );
    expect(response.body.channel).toStrictEqual(channel2);
    expect(response.body._links).toStrictEqual(
      routes["/users/:id/channels/:channelId"]
    );
  });
});
