// import { createClient } from "next-sanity";

// export const client = createClient({
//   projectId: "osn0rama",
//   dataset: "development",
//   apiVersion: "2024-01-01",
//   useCdn: false,
// });

import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "osn0rama",
    dataset: "development",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: "skJqkbiBFrTXtWMUIM8phAL0HjlaohqZH4Pg9zGLVQzx2FnOLkzDjMIOwmw5LnIfXEMAcsS2pDxMOhlNy5TxkOyjtShtu8qhzmVFOrVvdTPUKakFaXNeiVrcTHxMA5nsY5g48L1kxHEB3rUAQYFjB1nXRcT4ok9mt7DeyiLggnmWAIg6owcu",
});