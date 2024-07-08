import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

export const backend = defineBackend({
  auth,
  data,
});


backend.data.addHttpDataSource(
  "MyMongoDBDataSource",
  "https://data.mongodb-api.com"
);

backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
  mongodbsecret : process.env.MONGODB_DATA_API_KEY,
  atlasdataapipath: process.env.ATLAS_DATA_API_PATH,
};