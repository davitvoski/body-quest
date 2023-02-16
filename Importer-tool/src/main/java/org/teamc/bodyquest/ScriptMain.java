package org.teamc.bodyquest;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Indexes;
import org.teamc.bodyquest.database.MongoDB;
import org.teamc.bodyquest.io.ImporterCSV;
import org.teamc.bodyquest.schema.Exercise;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

public class ScriptMain {
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

            // Delete Collection
            MongoCollection<Exercise> colExercises = db.getCollection(Exercise.class,"exercises");
            db.dropCollection(colExercises);

            // Create and Replace collection
            db.createCollection("exercises");
            colExercises = db.getCollection(Exercise.class,"exercises");
            colExercises.insertMany(exercises);
            // Create Indexes
            colExercises.createIndex(Indexes.ascending("name"));
            colExercises.createIndex(Indexes.ascending("target"));
            colExercises.createIndex(Indexes.ascending("body_part"));

            db.closeConnection();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error while loading data into MongoDB");
            System.exit(1);
        }

    }
}