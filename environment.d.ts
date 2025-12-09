declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "dev" | "production" | "debug";
      DATABASE_URL: string;
      DIRECT_URL: string;
    }
  }
}

export {};
