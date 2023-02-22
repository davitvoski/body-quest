package org.teamc.bodyquest.database.collection;

import com.mongodb.client.MongoCollection;
import org.teamc.bodyquest.database.MongoDB;
import org.teamc.bodyquest.io.ImporterCSV;
import org.teamc.bodyquest.schema.Exercise;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

/**
 * This class represents the collection of exercises in the database
 */
public class ExercisesCollection {
    public final static String EXERCISES_COLLECTION = "exercises";
    private MongoDB db;
    private MongoCollection<Exercise> colExercises;
    private ArrayList<Exercise> exercises;


    /**
     * This method creates a new ExercisesCollection object
     * It first loads the dataset from the CSV file, fails if the file is not found or cannot be read
     * @param db MongoDB database
     * @throws IOException if the file of the dataset could not be read
     * @throws URISyntaxException if the file of the dataset is not found
     */
    public ExercisesCollection(MongoDB db) throws IOException, URISyntaxException{
            this.db = db;
            this.colExercises = db.getCollection(Exercise.class,"exercises");
            this.exercises = getDataset();
    }

    /**
     * This method loads the CSV file and returns a list of Exercise objects
     * @return List of Exercise objects
     * @throws IOException if the file could not be read
     * @throws URISyntaxException if the file is not found
     */
    private ArrayList<Exercise> getDataset() throws IOException, URISyntaxException{
        // Load File
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        return importer.loadCSV();
    }

    /**
     * This method saves the dataset into the MongoDB database
     */
    public void createCollection(){
        dropCollection();
        // Create and Replace collection
        db.dropCollection(colExercises);
        db.createCollection("exercises");
        // Create and Replace collection
        this.colExercises = db.getCollection(Exercise.class,EXERCISES_COLLECTION);
        this.colExercises.insertMany(exercises);
    }

    /**
     * This method creates an index in the collection for the given field
     * @param field field to be indexed
     * @param ascending true if the index is ascending, false if descending
     */
    public void indexField(String field, boolean ascending){
        if (ascending) {
            this.db.indexAscending(EXERCISES_COLLECTION, field);
        } else {
            this.db.indexDescending(EXERCISES_COLLECTION, field);
        }
    }

    /**
     * This method drops the collection from the database
     */
    public void dropCollection(){
        db.dropCollection(EXERCISES_COLLECTION);
    }

}
