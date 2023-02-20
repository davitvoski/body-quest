package org.teamc.bodyquest.gui.controllers;

import javafx.application.Platform;
import javafx.concurrent.Task;
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
            this.setNotificationLabel("Error while connecting to the database");
        }
    }


    /**
     * This method creates the collection
     * @param event ActionEvent
     */
    @FXML
    void createExerciseCollection(ActionEvent event) {
        Platform.runLater(() -> notificationLabel.setText("Loading..."));
        new Thread(() ->{
            exercisesCollection.createCollection();
            Platform.runLater(() -> setNotificationLabel("Collection created"));
        }).start();
    }

    /**
     * This method deletes the collection
     * @param event ActionEvent
     */
    @FXML
    void deleteExerciseCollection(ActionEvent event) {
        Platform.runLater(() -> notificationLabel.setText("Loading..."));
        new Thread(() ->{
            exercisesCollection.dropCollection();
            Platform.runLater(() -> setNotificationLabel("Collection deleted"));
        }).start();
    }

    /**
     * This method indexes all fields
     * @param event ActionEvent
     */
    @FXML
    void indexAllFields(ActionEvent event) {
        Platform.runLater(() -> notificationLabel.setText("Loading..."));
        new Thread(() ->{
            exercisesCollection.indexField("equipment", rb_ascending_index.isSelected());
            exercisesCollection.indexField("name", rb_ascending_index.isSelected());
            exercisesCollection.indexField("target", rb_ascending_index.isSelected());
            Platform.runLater(() ->  setNotificationLabel("All fields indexed"));
        }).start();
        }

    /**
     * This method indexes the equipment field
      * @param event ActionEvent
     */
    @FXML
    void indexEquipmentField(ActionEvent event) {
        Platform.runLater(() -> notificationLabel.setText("Loading..."));
            exercisesCollection.indexField("equipment", rb_ascending_index.isSelected());
            Platform.runLater(() ->  setNotificationLabel("Equipment field indexed"));
    }

    /**
     * This method indexes the name field
     * @param event ActionEvent
     */
    @FXML
    void indexNameField(ActionEvent event) {
        Platform.runLater(() -> notificationLabel.setText("Loading..."));
        exercisesCollection.indexField("name", rb_ascending_index.isSelected());
        Platform.runLater(() ->  setNotificationLabel("Name field indexed"));
    }

    /**
     * This method indexes the target field
     * @param event ActionEvent
     */
    @FXML
    void indexTargetField(ActionEvent event) {
        Platform.runLater(() -> notificationLabel.setText("Loading..."));
        exercisesCollection.indexField("target", rb_ascending_index.isSelected());
        Platform.runLater(() ->  setNotificationLabel("Target field indexed"));
    }

    /**
     * This method sets the notification label
     * @param s String to be set
     */
    private void setNotificationLabel(String s){
        notificationLabel.setText(s);
    }
}
