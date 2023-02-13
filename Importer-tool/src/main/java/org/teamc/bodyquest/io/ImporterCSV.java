package org.teamc.bodyquest.io;

import com.mongodb.lang.NonNull;
import com.mongodb.lang.Nullable;
import org.teamc.bodyquest.Exercise;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class ImporterCSV {
    private String fileName = "fitness-exercises.csv";

    public ImporterCSV(String fileName){
        this.fileName = fileName;
    }

    public List<Exercise> loadCSV() throws URISyntaxException, IOException {
        List<String> lines = readCSV();
        ArrayList<Exercise> exercises = new ArrayList<>();
        for (String line: lines) {
            if(lines.get(0).equals(line)) continue;
            String[] splitLine = line.split(",");
            exercises.add(new Exercise(splitLine[0],splitLine[1],splitLine[2],splitLine[3],splitLine[4],splitLine[5]));
        }

        for (Exercise exercise:
             exercises) {
            System.out.println(exercise);
        }

        return exercises;
    }

    private List<String> readCSV() throws URISyntaxException, IOException {
        var url = getClass().getClassLoader().getResource(this.fileName);
        assert url != null;
        Path path = Paths.get(url.toURI());
        return Files.readAllLines(path, StandardCharsets.UTF_8);
    }
}
