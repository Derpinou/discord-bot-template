declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            GUILD_ID: string;
        }
    }
}
export {};