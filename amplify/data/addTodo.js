import { util } from "@aws-appsync/utils";

export function request(ctx) {
  console.log(`adding object with args ${JSON.stringify(ctx.arguments)}`);

  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/insertOne`,
    params: {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Accept": "application/json",
        "api-key": ctx.env.mongodbsecret
      },
      body: {
        "collection": "Todos",
        "database": "Integration",
        "dataSource": "Cluster1",
        "document": {
          "content": ctx.arguments.content,
          "username": ctx.identity.username,
        }
      },
    },
  };
}

export function response(ctx) {
 const res = JSON.parse(ctx.result.body)

	// https://www.mongodb.com/docs/atlas/api/data-api-resources/#response-2
	if (res.insertedId) {
		return {id: "id3", content: "title3"}
	} else {
		util.error('record failed to be inserted')
	}
}