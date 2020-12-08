import { readdirSync } from "fs";
import { parse } from "path";
import { fastify } from "../index";

/**
 * Eksport wszystkich memberów z folder ./models
 */
export * from "./user";

/**
 * Regexp do sprawdzenia rozszerzenia importu pliku modelu
 */
const regexpExt = /\.model\.(js|ts)$/gm;

/**
 * Importuje wszystkie modele bazy danych zawarte w folderze ./models
 */
export const importModels = (): void => {
  readdirSync(__dirname).forEach((file) => {
    const parsedFile = parse(file);
    if (parsedFile.name !== "index" && regexpExt.test(parsedFile.base)) {
      fastify.log.info(`Importuję ${parsedFile.base}`);
      require(`./${parsedFile.base}`);
    }
  });
};
