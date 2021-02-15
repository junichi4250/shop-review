import algoliasearch, { SearchClient } from "algoliasearch";
import Constants from "expo-constants";

const client: SearchClient = algoliasearch(
  Constants.manifest.extra.algolia.appId,
  Constants.manifest.extra.algolia.serchApiKey
);

export const serchReview = async (query: string) => {
  const index = client.initIndex("reviews");
  return await index.search(query);
};
