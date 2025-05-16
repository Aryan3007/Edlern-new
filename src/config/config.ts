// src/config.js
export const SERVER_URL = ((import.meta as unknown) as ImportMetaWithEnv).env.VITE_SERVER_URL

interface ImportMetaWithEnv extends ImportMeta {
  env: ImportMetaEnv & {
	VITE_SERVER_URL: string;
  };
}
