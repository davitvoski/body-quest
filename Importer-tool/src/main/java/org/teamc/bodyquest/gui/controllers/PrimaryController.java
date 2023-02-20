package org.teamc.bodyquest.gui.controllers;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.RadioButton;
import javafx.scene.control.ToggleGroup;
import org.teamc.bodyquest.database.MongoDB;
import org.teamc.bodyquest.database.collection.ExercisesCollection;

/**
 * This class represents the controller of the primary window
 */
public class PrimaryController {
    private ExercisesCollection exercisesCollection;

    @FXML
    private RadioButton rb_ascending_index;
    @FXML
    private Label notificationLabel;

    public PrimaryController(){
        try {
            exercisesCollection = new ExercisesCollection(new MongoDB("body-quest"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * This method creates the collection
     * @param event ActionEvent
     */
    @FXML
    void createExerciseCollection(ActionEvent event) {
        exercisesCollection.createCollection();
        setNotificationLabel("Collection created");
    }

    /**
     * This method deletes the collection
     * @param event ActionEvent
     */
    @FXML
    void deleteExerciseCollection(ActionEvent event) {
        exercisesCollection.dropCollection();
        setNotificationLabel("Collection deleted");

    }

    /**
     * This method indexes all fields
     * @param event ActionEvent
     */
    @FXML
    void indexAllFields(ActionEvent event) {
        exercisesCollection.indexField("equipment", rb_ascending_index.isSelected());
        exercisesCollection.indexField("name", rb_ascending_index.isSelected());
        exercisesCollection.indexField("target", rb_ascending_index.isSelected());
        setNotificationLabel("All fields indexed");
        }

    /**
     * This method indexes the equipment field
      * @param event ActionEvent
     */
    @FXML
    void indexEquipmentField(ActionEvent event) {
        exercisesCollection.indexField("equipment", rb_ascending_index.isSelected());
        setNotificationLabel("Equipment field indexed");
    }

    /**
     * This method indexes the name field
     * @param event ActionEvent
     */
    @FXML
    void indexNameField(ActionEvent event) {
        exercisesCollection.indexField("name", rb_ascending_index.isSelected());
        setNotificationLabel("Name field indexed");
    }

    /**
     * This method indexes the target field
     * @param event ActionEvent
     */
    @FXML
    void indexTargetField(ActionEvent event) {
        exercisesCollection.indexField("target", rb_ascending_index.isSelected());
        setNotificationLabel("Target field indexed");
    }

    /**
     * This method sets the notification label
     * @param s String to be set
     */
    private void setNotificationLabel(String s){
        notificationLabel.setText(s);
    }
}
