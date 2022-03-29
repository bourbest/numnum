import { string, required, Schema, arrayOf } from "../../sapin";

export const ingredientSchema = new Schema({
  id: string,
  name: string(required),
  otherNames: arrayOf(string),
});
