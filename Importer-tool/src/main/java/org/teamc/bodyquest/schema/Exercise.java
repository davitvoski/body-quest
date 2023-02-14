package org.teamc.bodyquest.schema;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.*;

/**
 * This class represents the structure of an Exercise to be stored.
 */
public class Exercise {
    private ObjectId id;
    @BsonProperty(value = "body_part")
    private String bodyPart;
    private String equipment;
    private String gifUrl;
    private String name;
    private String target;

    public Exercise(){}

    /**
     * Constructor for the Exercise class.
     * @param bodyPart : body part that the exercise targets
     * @param equipment : equipment needed for the exercise
     * @param gifUrl : url of the gif
     * @param name : name of the exercise
     * @param target : muscle that the exercise targets
     */
    public Exercise(String bodyPart, String equipment, String gifUrl,String name, String target){
        this.bodyPart = bodyPart;
        this.equipment = equipment;
        this.gifUrl = gifUrl;
        this.name = name;
        this.target = target;
    }

    /**
     * This method returns a string representation of the Exercise object.
     * @return representation of the Exercise object
     */
    public String toString(){
        return "Exercise{" + "bodyPart=" + bodyPart + ", equipment=" + equipment +
                ", gifUrl=" + gifUrl + ", id=" + id + ", name=" + name + ", target=" + target +'}';
    }

    public ObjectId getId(){
        return id;
    }
    public Exercise setId(ObjectId id) {
        this.id = id;
        return this;
    }

    public String getBodyPart() {
        return bodyPart;
    }
    public Exercise setBodyPart(String bodyPart) {
        this.bodyPart = bodyPart;
        return this;
    }

    public String getEquipment() {
        return equipment;
    }

    public Exercise setEquipment(String equipment) {
        this.equipment = equipment;
        return this;
    }

    public String getGifUrl() {
        return gifUrl;
    }

    public Exercise setGifUrl(String gifUrl) {
        this.gifUrl = gifUrl;
        return this;
    }

    public String getName() {
        return name;
    }

    public Exercise setName(String name) {
        this.name = name;
        return this;
    }

    public String getTarget() {
        return target;
    }

    public Exercise setTarget(String target) {
        this.target = target;
        return this;
    }



}
