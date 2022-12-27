import { createClient } from "next-sanity";

const client = createClient({
	projectId: "3h6e8jg3",
	dataset: "prod",
	apiVersion: "2022-12-26",
	useCdn: false,
});

export default client;
