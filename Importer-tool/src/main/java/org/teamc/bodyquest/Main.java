package org.teamc.bodyquest;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.teamc.bodyquest.database.MongoDB;
import org.teamc.bodyquest.io.ImporterCSV;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class Main {
    /**
     * NEEDED: USER and PASSWORD from Variables.java
     */
    static String URL = "mongodb+srv://" + Variables.USER + ":" + Variables.PASSWORD + "@cluster0.ktirqdm.mongodb.net/?retryWrites=true&w=majority";

    public static void main(String[] args) {
        // Load File
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        List<Exercise> exercises = new ArrayList<>();
        try {
            exercises = importer.loadCSV();
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            System.out.println("Error while importing CSV file");
        }
        // Save to MongoDB
        try {
            MongoDB db = new MongoDB("body-quest");
            MongoDatabase database = db.getDatabase();

            // Delete Collection
            MongoCollection<Exercise> colExercises = db.getCollection(Exercise.class,"exercises");
            db.dropCollection(colExercises);

            // Create and Replace collection
            db.createCollection("exercises");
            colExercises = db.getCollection(Exercise.class,"exercises");
            colExercises.insertMany(exercises);
            // Aggregate Query which groups all exercises by taget
//            /**
//             * _id: The id of the group.
//             * fieldN: The first field name.
//             */
//            {
//                _id: "$target",
//                        exercises: {
//                $addToSet: {
//                    name: "$name",
//                            body_part: "$body_part",
//                            gifUrl: "$gifUrl",
//                            equipment: "$equipment"
//                }
//            }
//
//            }

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error while loading data into MongoDB");
            System.exit(1);
        }

    }
}