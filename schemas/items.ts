import { schema } from "normalizr";

const item = new schema.Entity("items", {}, { idAttribute: "item_id" });

export const itemSchema = [ item ];
