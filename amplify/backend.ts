import { defineBackend, secret } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

export const backend = defineBackend({
  auth,
  data,
});


const httpDataSource = backend.data.addHttpDataSource(
  "MyMongoDBDataSource",
  "https://data.mongodb-api.com"
);

backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
  // mongodbsecret: secret('APPSYNC_MONGO_API_KEY'),
  mongodbsecret2 : "xxxx",
};