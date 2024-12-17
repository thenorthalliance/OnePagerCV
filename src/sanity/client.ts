import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "oa6bybsk",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: "sk1N2TmNStE1IZqA2WVvbtp54qPVfYJkiFhUDbiehF0ZKc84b1XsjaOO3ROta8ETx3yorhaRUe26293mxisK4Fcz7RfE1OnmNBfmeYinIT2ExD8NcIjy1i3fSXw7lXdAbhWFVUdnwK9TE2jcT5BpZKzn8RwTRmtOM5bYaeFN8C2FgOcdJ1Zz", // NoA CV Builder Preview 
    // token: "skk69AZ1FDa8IEU4I2gkLRTtO97iOjKU0Lu7qeE0XAOBEiqOftMZ0Qv2lLLE0hmj6bofJq2eoxNGOcf4MDpQ04ku5svsiKLVSAFCHqMVJ1sJEviKrpaOmtnA0pAP0rzAprtXxwPY3TvIoSN4EL68J9xijpa0z2LX1Ty0yN2N7aroVuqKAi8Q", // NoA CV Builder token 
});