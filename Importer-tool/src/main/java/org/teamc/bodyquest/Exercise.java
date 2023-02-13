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
