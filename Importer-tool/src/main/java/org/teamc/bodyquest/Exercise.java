package org.teamc.bodyquest;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.*;
import org.bson.types.*;
import java.util.*;

/**
 * This class represents the structure of an Exercise to be stored.
 */
public class Exercise {
    private BsonString bodyPart;
    private BsonString equipment;
    private BsonString gifUrl;
    private BsonString id; // Try and remove it
    private BsonString name;
    @BsonProperty(value = "muscle")
    private BsonString target;

    public Exercise(){}

    /**
     * Constructor for the Exercise class.
     * @param bodyPart : body part that the exercise targets
     * @param equipment : equipment needed for the exercise
     * @param gifUrl : url of the gif
     * @param id : id of the exercise
     * @param name : name of the exercise
     * @param target : muscle that the exercise targets
     */
    public Exercise(String bodyPart, String equipment, String gifUrl, String id, String name, String target){
        this.bodyPart = new BsonString(bodyPart);
        this.equipment = new BsonString(equipment);
        this.gifUrl = new BsonString(gifUrl);
        this.id = new BsonString(id);
        this.name = new BsonString(name);
        this.target = new BsonString(target);
    }

    /**
     * This method returns a string representation of the Exercise object.
     * @return representation of the Exercise object
     */
    public String toString(){
        return "Exercise{" + "bodyPart=" + bodyPart + ", equipment=" + equipment +
                ", gifUrl=" + gifUrl + ", id=" + id + ", name=" + name + ", target=" + target +'}';
    }

    public BsonString getTarget() {
        return target;
    }

    public void setTarget(BsonString target) {
        this.target = target;
    }

    public BsonString getName() {
        return name;
    }

    public void setName(BsonString name) {
        this.name = name;
    }

    public BsonString getId() {
        return id;
    }

    public void setId(BsonString id) {
        this.id = id;
    }

    public BsonString getGifUrl() {
        return gifUrl;
    }

    public void setGifUrl(BsonString gifUrl) {
        this.gifUrl = gifUrl;
    }

    public BsonString getEquipment() {
        return equipment;
    }

    public void setEquipment(BsonString equipment) {
        this.equipment = equipment;
    }

    public BsonString getBodyPart() {
        return bodyPart;
    }

    public void setBodyPart(BsonString bodyPart) {
        this.bodyPart = bodyPart;
    }
}
