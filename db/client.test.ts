import { Client } from "./client";

// This is just to cover a couple of rogue paths
// that don't get covered by other tests interacting
// with the data layer
describe("Mongo client", () => {
  describe("teardown", () => {
    it("Doesn't throw when the client isn't initialised before teardown", async () => {
      const client = new Client();

      expect(await client.teardown()).toBeUndefined();
    });
  });

  describe("getCollections", () => {
    it("Throws if init hasn't already been called", async () => {
      const client = new Client();

      try {
        await client.getCollections();
      } catch (e) {
        expect((e as Error).message).toBe(
          "Mongo collections not yet instantiated",
        );
      }

      expect.assertions(1);
    });
  });
});
