import { util } from "@aws-appsync/utils";

export function request(ctx) {
  console.log(`hello from request`);
  return {
    method: "POST",
    resourcePath: "/app/data-yiqye/endpoint/data/v1/action/find",
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
    return JSON.parse(ctx.result.body).documents;
  } else {
    return  {id: "id7error", content: `${JSON.stringify(ctx)}`};
  }
}