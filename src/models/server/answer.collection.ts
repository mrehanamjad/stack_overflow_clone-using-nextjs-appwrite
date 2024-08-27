import { Permission } from "node-appwrite";
import { db, answerCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  // create collection
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Answer collection is created");

  // create attributes
  await Promise.all([
    databases.createStringAttribute(db,answerCollection,'content',10000,true),
    databases.createStringAttribute(db,answerCollection,'questionId',50,true),
    databases.createStringAttribute(db,answerCollection,'authorId',50,true)

  ])
  console.log("Answer atributes created");

}
