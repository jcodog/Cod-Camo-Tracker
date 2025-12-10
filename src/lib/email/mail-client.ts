import { MailChannelsClient } from "@jconet-ltd/mailchannels-client";

export const mailClient = new MailChannelsClient({
  apiKey: process.env.MAILCHANNELS_API_KEY ?? "",
  dkim: {
    domain: process.env.MAILCHANNELS_DKIM_DOMAIN ?? "",
    selector: process.env.MAILCHANNELS_DKIM_SELECTOR ?? "",
    privateKey: process.env.MAILCHANNELS_DKIM_PRIVATE_KEY ?? "",
  },
});
