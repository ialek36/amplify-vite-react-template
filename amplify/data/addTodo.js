import { util } from "@aws-appsync/utils";


export function request(ctx) {
  console.log(`adding object with args ${JSON.stringify(ctx.arguments)}`);
  const secret = ctx.env.mongodbsecret;

  return {
    method: "POST",
    resourcePath: "/app/data-yiqye/endpoint/data/v1/action/insertOne",
    params: {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Accept": "application/json",
        "api-key": "xxxxx"
        // "api-key": secret
        // "api-key": `"${secret}"`
      },
      body: {
        "collection": "Todos",
        "database": "Integration",
        "dataSource": "Cluster1",
        "document": {
          "content": ctx.arguments.content,
          "id": "id2"
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