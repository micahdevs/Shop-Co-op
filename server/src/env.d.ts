declare namespace NodeJS {
  export interface ProcessEnv {
    PGPORT: number;
    PGDATABASE: string;
    PGUSER: string;
    PGPASSWORD: string;
  }
}