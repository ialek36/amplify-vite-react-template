export function request(ctx) {
  console.log(`adding object with args ${JSON.stringify(ctx.arguments)}`);

  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/deleteOne`,
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
        "filter": {
        "_id": { "$oid": ctx.arguments.id },
        "username": ctx.identity.username,
        }
      },
    },
  };
}

export function response(ctx) {
	// https://www.mongodb.com/docs/atlas/api/data-api-resources/#response-2
  if (ctx.result.statusCode == 200) {
    return "200";
  } else {
    return  `${JSON.stringify(ctx)}`;
  }
}