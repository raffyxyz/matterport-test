import { GraphQLClient } from "graphql-request";

// const base64Credentials = Buffer.from(
//   `${process.env.VITE_API_TOKEN}:${process.env.VITE_API_SECRET}`
// ).toString("base64");

const credentials = `${import.meta.env.VITE_API_TOKEN}:${
  import.meta.env.VITE_API_SECRET
}`;
const base64Credentials = btoa(credentials);

export const client = new GraphQLClient(
  import.meta.env.VITE_MATTERPORT_API_ENDPOINT!,
  {
    credentials: `include`,
    mode: `no-cors`,
    headers: { Authorization: `Basic ${base64Credentials}` },
  }
);
