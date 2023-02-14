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

        for (Exercise exer :
                exercises) {
            System.out.println(exer.toString());
        }
        // Register Codec
        CodecRegistry pojoCodecRegistry = fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
                pojoCodecRegistry);

        // MongoDb Settings
        ConnectionString connectionString = new ConnectionString(URL);
        MongoClientSettings clientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .codecRegistry(codecRegistry)
                .build();
        // Connect to mongo
        try (MongoClient mongoClient = MongoClients.create(clientSettings)) {
            MongoDatabase database = mongoClient.getDatabase("body-quest");

            // Delete Collection
            MongoCollection<Exercise> colExercises = database.getCollection("exercises", Exercise.class);
            //        MongoCollection<Book> colExercises = database.getCollection("exercises", Book.class)  ;

            colExercises.drop();
            // Create and Replace collection
            database.createCollection("exercises");
            colExercises = database.getCollection("exercises", Exercise.class);
            colExercises.insertMany(exercises);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error while loading data into MongoDB");
            System.exit(1);
        }

    }
}