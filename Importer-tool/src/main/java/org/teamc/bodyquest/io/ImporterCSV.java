package org.teamc.bodyquest.io;

import org.teamc.bodyquest.Exercise;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

/**
 * This class imports the dataset from a CSV file into an ArrayList of Exercise objects.
 */
public class ImporterCSV {
    private String fileName;

    /**
     * Constructor for the ImporterCSV class with a file name
     * @param fileName The name of the file to be imported
     */
    public ImporterCSV(String fileName){
        this.fileName = fileName;
    }

    /**
     * This method loads the CSV file and returns a list of Exercise objects
     * @return List of Exercise objects
     * @throws URISyntaxException if the file is not found
     * @throws IOException if the file could not be read
     */
    public List<Exercise> loadCSV() throws URISyntaxException, IOException {
        List<String> lines = readCSV();
        ArrayList<Exercise> exercises = new ArrayList<>();
        for (String line: lines) {
            if(line.equals(lines.get(0))) continue; // Skip first line (header
            String[] splitLine = line.split(",");
            Exercise exercise = new Exercise().setBodyPart(splitLine[0])
                    .setEquipment(splitLine[1])
                    .setGifUrl(splitLine[2])
                    .setName(splitLine[4])
                    .setTarget(splitLine[5]);
            exercises.add(exercise);
        }

        return exercises;
    }

    /**
     * Reads the CSV file and returns a list of lines
     * @return List of lines
     * @throws URISyntaxException if the file is not found
     * @throws IOException if the file could not be read
     */
    public List<String> readCSV() throws URISyntaxException, IOException {
        var url = getClass().getClassLoader().getResource(this.fileName);
        assert url != null;
        Path path = Paths.get(url.toURI());
        return Files.readAllLines(path, StandardCharsets.UTF_8);
    }
}
