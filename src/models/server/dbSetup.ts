//this file is for For seeeding or initializing the database

import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
    try {
        await databases.get(db)
        console.log("DataBase Connnected");
        
    } catch (error) {
        try {
            await databases.create(db,db)
            console.log("DataBase Created");
            // creating collections:
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ])
            console.log("Connection created");
            console.log("Database Created")
        } catch (error) {
            console.log("Error Creating DataBases or Collections",error);
            
        }
    }

    return databases;
}