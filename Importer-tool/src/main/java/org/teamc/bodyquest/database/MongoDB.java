package org.teamc.bodyquest.database;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCommandException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.teamc.bodyquest.Variables;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

/**
 * This Class Interfaces with the MongoDB
 */
public class MongoDB {
    /**
     * NEEDED: USER and PASSWORD from Variables.java
     */
    public static String URL = "mongodb+srv://" + Variables.USER + ":" + Variables.PASSWORD + "@cluster0.ktirqdm.mongodb.net/?retryWrites=true&w=majority";

    private final MongoDatabase database;
    private final MongoClient mongoClient;

    /**
     * Creates a MongoDB Object
     * @param databaseName Name of the Database to connect to
     */
    public MongoDB(String databaseName){
        this.mongoClient = createConnection();
        this.database = this.mongoClient.getDatabase(databaseName);
    }

    /**
     * Creates a connection to the MongoDB
     * @return MongoClient
     */
    private MongoClient createConnection(){
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

        return MongoClients.create(clientSettings);
    }

    /**
     * Returns a Collection from the Database based on a class type
     * @param classType Class Type to map the Collection to
     * @param collectionName  Name of the Collection to get
     * @return Collection wanted
     * @param <E> : Class Type
     */
    public <E> MongoCollection<E> getCollection(Class<E> classType, String collectionName){
        return this.database.getCollection(collectionName, classType);
    }

    /**
     * Creates a Collection in the Database
     * @param collectionName Name of the Collection to create
     */
    public void createCollection(String collectionName){
        this.database.createCollection(collectionName);
    }

    /**
     * Drops a Collection from the Database
     * @param collection Collection to drop
     */
    public void dropCollection(MongoCollection collection){
        collection.drop();
    }

    /**
     * Closes the Connection to the MongoDB
     */
    public void closeConnection(){
        this.mongoClient.close();
    }

    /**
     * This method drops a collection from the database
     * @param collectionName Name of the Collection to drop
     */
    public void dropCollection(String collectionName){
        this.database.getCollection(collectionName).drop();
    }
    /**
     * Drops the Database
     */
    public void deleteDatabase() {
        try{
            this.database.drop();
        }catch (MongoCommandException e){
            System.out.println(e.getMessage());
            System.out.println("You are not allowed to perform to drop a database. ");
        }
    }

    public MongoDatabase getDatabase() {
        return database;
    }

    public MongoClient getMongoClient() {
        return mongoClient;
    }
}
