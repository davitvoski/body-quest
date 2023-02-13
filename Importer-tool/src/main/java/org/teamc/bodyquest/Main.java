package org.teamc.bodyquest;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.List;

public class Main {
    static String URL = "mongodb+srv://" + Variables.USER +":" + Variables.PASSWORD + "@cluster0.ktirqdm.mongodb.net/?retryWrites=true&w=majority";
    public static void main(String[] args) {
        ConnectionString connectionString = new ConnectionString(URL);
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .serverApi(ServerApi.builder()
                        .version(ServerApiVersion.V1)
                        .build())
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase("body-quest");

        MongoCollection<Exercise> colExercises = database.getCollection("exercises", Exercise.class);
        colExercises.drop();
        database.createCollection("exercises");
    }
}