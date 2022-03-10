import { createServer } from "miragejs";

export function startBackend() {
  return createServer({
    seeds(server) {
      server.db.loadData({
        consents: [
          {
            name: "John Doe",
            email: "john.doe@example.com",
            consents: {
              newsletter: true,
              ads: true,
              statistics: false,
            },
          },
          {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            consents: {
              newsletter: false,
              ads: false,
              statistics: true,
            },
          },
          {
            name: "Name 3",
            email: "name3@example.com",
            consents: {
              newsletter: true,
              ads: true,
              statistics: true,
            },
          },
          {
            name: "Name 4",
            email: "name4@example.com",
            consents: {
              newsletter: true,
              ads: false,
              statistics: true,
            },
          },
          {
            name: "Fake Doe",
            email: "fake.doe@example.com",
            consents: {
              newsletter: true,
              ads: true,
              statistics: true,
            },
          },
          {
            name: "John smith",
            email: "jane.smith@example.com",
            consents: {
              newsletter: true,
              ads: false,
              statistics: true,
            },
          },
        ],
      });
    },

    routes() {
      this.get("/consents", (schema) => {
        return {
          rows: schema.db.consents.length,
          consents: schema.db.consents,
        };
      });

      this.post("/consents", (schema, request) => {
        const consent = JSON.parse(request.requestBody);
        schema.db.consents.insert(consent);
      });
    },
  });
}
