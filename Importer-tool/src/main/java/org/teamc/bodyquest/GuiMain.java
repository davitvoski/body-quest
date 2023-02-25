package org.teamc.bodyquest;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;

import java.io.IOException;

/**
 * JavaFX App
 */
public class GuiMain extends Application {

    public static Stage primaryStage;

    @Override
    public void start(final Stage stage) throws IOException {
        primaryStage = stage;

        Scene scene = new Scene(loadFXML("primary"), 780, 480);
        stage.setScene(scene);
        stage.setTitle("BodyQuest - Dataset Importer");
        stage.show();
    }


    public static Parent loadFXML(String fxml) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(GuiMain.class.getResource( fxml + ".fxml"));
        return fxmlLoader.load();
    }

    public static void main(String[] args) {
        launch();
    }

}
