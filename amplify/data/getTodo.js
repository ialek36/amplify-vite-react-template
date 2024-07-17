import { util } from "@aws-appsync/utils";

export function request(ctx) {
  console.log(`hello from request`);
  return {
    method: "POST",
    resourcePath: `${ctx.env.atlasdataapipath}/findOne`,
    params: {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Accept": "application/json",
        "api-key": ctx.env.mongodbsecret
      },
      body: {
        "collection": "Todos",
        "database":"Integration",
        "dataSource":"Cluster1",
        "filter": {
          "username": ctx.identity.username,
        },
        "projection": {"_id": 1, "content":1}
      },
    },
  };
}

export function response(ctx) {
  
  console.log(`hello from response`);
  if (ctx.error) {
    return util.error(ctx.error.message, ctx.error.type);
  }
  if (ctx.result.statusCode == 200) {
    return JSON.parse(ctx.result.body).document;
  } else {
    return  {id: "error", content: `${JSON.stringify(ctx)}`};
  }
}