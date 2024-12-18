import type { EventBridgeHandler } from "aws-lambda";
import refresh_token from "./Login/refresh_token";

export const handler: EventBridgeHandler<"Scheduled Event", null, void> = async (event) => {
  console.log("event", JSON.stringify(event, null, 2))
  
  await refresh_token();
}