import { Client } from "@elastic/elasticsearch";
import { UIMessage } from "ai";

export const flightIndex: string = "upcoming-flight-data";
export const client: Client = new Client({
  node: process.env.ELASTIC_ENDPOINT,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY || "",
  },
});

const messageIndex: string = "chat-messages";
export async function persistMessage(message: UIMessage, id: string) {
  try {
    if (!(await client.indices.exists({ index: messageIndex }))) {
      await client.indices.create({
        index: messageIndex,
        mappings: {
          properties: {
            "chat-id": { type: "keyword" },
            message: {
              type: "object",
              properties: {
                id: { type: "keyword" },
                role: { type: "keyword" },
                text: { type: "semantic_text" }
              },
            },
            "@timestamp": { type: "date" },
          },
        },
      });
      await new Promise((r) => setTimeout(r, 2000));
    }

    const messageText = message.parts.map(part => "text" in part && typeof part.text === "string" ? part.text : "").join(" ")

    await client.index({
      index: messageIndex,
      document: {
        "chat-id": id,
        message: {
            id: message.id,
            role: message.role,
            text: messageText
        },
        "@timestamp": new Date().toISOString(),
      },
    });
  } catch (e) {
    console.error("Unable to persist message", e);
  }
}

export async function getSimilarMessages(
  message: UIMessage
): Promise<UIMessage[]> {
  try {
    const result = await client.search<{ message: UIMessage }>({
      index: messageIndex,
      query: {
        semantic: {
          field: "message.parts.text",
          query: message.parts
            .map((part) =>
              "text" in part && typeof part.text === "string" ? part.text : " "
            )
            .join(" "),
        },
      },
      sort: [{ "@timestamp": "asc" }],
      size: 20,
    });

    return result.hits.hits
      .map((hit) => hit._source?.message)
      .filter((msg): msg is UIMessage => msg !== undefined);
  } catch (e) {
    console.error("Unable to retrieve messages", e);
    return [];
  }
}
