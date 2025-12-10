declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "dev" | "production" | "debug";
      DATABASE_URL?: string;
      DIRECT_URL?: string;
      NEXT_PUBLIC_APP_URL?: string;
      BETTER_AUTH_SECRET?: string;
      MAILCHANNELS_API_KEY?: string;
      MAILCHANNELS_DKIM_DOMAIN?: string;
      MAILCHANNELS_DKIM_SELECTOR?: string;
      MAILCHANNELS_DKIM_PRIVATE_KEY?: string;
      MAILCHANNELS_FROM_EMAIL?: string;
      MAILCHANNELS_FROM_NAME?: string;
    }
  }
}

export {};
