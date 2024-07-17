import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a.customType({
      _id: a.id().required(),
      content: a.string().required(),
    }),

    addTodo: a
      .mutation()
      .arguments({
        id: a.id(),
        content: a.string().required(),
      })
      .returns(a.ref("Todo"))
      .authorization(allow => [allow.authenticated()])
      .handler(
        a.handler.custom({
          dataSource: "MyMongoDBDataSource",
          entry: "./addTodo.js",
        })
      ),
      getTodo: a
      .query()
      .arguments({ id: a.id().required() })
      .returns(a.ref("Todo"))
      .authorization(allow => [allow.authenticated()])
      .handler(
        a.handler.custom({
          dataSource: "MyMongoDBDataSource",
          entry: "./getTodo.js",
        })
      ),
      listTodo: a
      .query()
      .returns(a.ref("Todo").array())
      .authorization(allow => [allow.authenticated()])
      .handler(
        a.handler.custom({
          dataSource: "MyMongoDBDataSource",
          entry: "./listTodo.js",
        })
      ),
      deleteTodo: a
      .mutation()
      .arguments({
        id: a.string().required(),
      })
      .returns(a.string())
      .authorization(allow => [allow.authenticated()])
      .handler(
        a.handler.custom({
          dataSource: "MyMongoDBDataSource",
          entry: "./deleteTodo.js",
        })
      ),
      updateTodo: a
      .mutation()
      .arguments({
        _id: a.string().required(),
        content: a.string().required(),
      })
      .returns(a.string())
      .authorization(allow => [allow.authenticated()])
      .handler(
        a.handler.custom({
          dataSource: "MyMongoDBDataSource",
          entry: "./updateTodo.js",
        })
      ),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});