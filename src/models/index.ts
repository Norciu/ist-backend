import { readdirSync } from "fs";
import { parse } from "path";

/**
 * Eksport wszystkich memberów z folder ./models
 */
export * from './user.model';



/**
 * Importuje wszystkie modele bazy danych zawarte w folderze ./models
 */
readdirSync(__dirname).forEach((file) => {
  const parsedFile = parse(file);
  if (parsedFile.name !== "index") {
    require(`./${parsedFile.base}`);
  }
});
