import { openDB } from "idb";
import { keyBy } from "lodash";
import shortid from "shortid";

const DB_VERSION = 10;

export const RECIPE_STORE = "recipies";
export const PLAN_STORE = "plan";
export const INGREDIENT_STORE = "ingredients";

let _db = null;
export const getDb = function () {
  return _db;
};

export const setupDatabase = function () {
  //check for support
  if (!("indexedDB" in window)) {
    throw new Error("This browser doesn't support IndexedDB");
  }

  const dbPromise = openDB("numnum", DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      console.log("in upgrade version");

      if (!db.objectStoreNames.contains(RECIPE_STORE)) {
        db.createObjectStore(RECIPE_STORE, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(PLAN_STORE)) {
        db.createObjectStore(PLAN_STORE, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(INGREDIENT_STORE)) {
        db.createObjectStore(INGREDIENT_STORE, { keyPath: "id" });
      }
    },
  });

  return dbPromise.then((db) => {
    _db = db;
    return db;
  });
};

export const saveEntity = function (entity, storeName) {
  const db = getDb();
  if (!entity.id) {
    entity.id = shortid.generate();
  }

  return db.put(storeName, entity).then(() => entity);
};

export const getAllById = function (storeName) {
  const db = getDb();
  return db.getAll(storeName).then((entities) => keyBy(entities, "id"));
};

export const getById = function (storeName, id) {
  const db = getDb();
  return db.get(storeName, id);
};
