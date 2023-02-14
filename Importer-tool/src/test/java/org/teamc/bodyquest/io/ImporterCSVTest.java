package org.teamc.bodyquest.io;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ImporterCSVTest {

    @Test
    void loadCSV() {
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        try {
            var data = importer.loadCSV();
        } catch (Exception e) {
            e.printStackTrace();
            fail("Error while loading CSV file");
        }
    }

    @Test
    void isSecondExerciseCorrectlyLoaded() {
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        try {
            var data = importer.loadCSV();
            var exercise = data.get(1);
            assertEquals("waist", exercise.getBodyPart());
            assertEquals("body weight", exercise.getEquipment());
            assertEquals("http://d205bpvrqc9yn1.cloudfront.net/0002.gif", exercise.getGifUrl());
            assertEquals("45° side bend", exercise.getName());
            assertEquals("abs", exercise.getTarget());
        } catch (Exception e) {
            e.printStackTrace();
            fail("Error while loading CSV file");
        }
    }
    @Test
    void isBeforeLastExerciseCorrectlyLoaded() {
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        try {
            var data = importer.loadCSV();
            var exercise = data.get(data.size()-2);
            assertEquals("lower arms", exercise.getBodyPart());
            assertEquals("body weight", exercise.getEquipment());
            assertEquals("http://d205bpvrqc9yn1.cloudfront.net/1428.gif", exercise.getGifUrl());
            assertEquals("wrist circles", exercise.getName());
            assertEquals("forearms", exercise.getTarget());
        } catch (Exception e) {
            e.printStackTrace();
            fail("Error while loading CSV file");
        }
    }

    @Test
    void readCSV() {
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        try {
            importer.readCSV();
        } catch (Exception e) {
            e.printStackTrace();
            fail("Error while reading CSV file");
        }
    }

    @Test
    void isFirstLineOfDataSetCorrect() {
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        try {
            var data = importer.readCSV();
            var firstLine = data.get(1).split(",");
            assertEquals("waist", firstLine[0]);
            assertEquals("body weight", firstLine[1]);
            assertEquals("http://d205bpvrqc9yn1.cloudfront.net/0001.gif", firstLine[2]);
            assertEquals("0001", firstLine[3]);
            assertEquals("3/4 sit-up", firstLine[4]);
            assertEquals("abs", firstLine[5]);
        } catch (Exception e) {
            e.printStackTrace();
            fail("Error while reading CSV file");
        }
    }

    @Test
    void isLastLineOfDataSetCorrect() {
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        try {
            var data = importer.readCSV();
            var lastLine = data.get(data.size() - 1).split(",");
            assertEquals("lower arms", lastLine[0]);
            assertEquals("weighted", lastLine[1]);
            assertEquals("http://d205bpvrqc9yn1.cloudfront.net/0859.gif", lastLine[2]);
            assertEquals("0859", lastLine[3]);
            assertEquals("wrist rollerer", lastLine[4]);
            assertEquals("forearms", lastLine[5]);
        } catch (Exception e) {
            e.printStackTrace();
            fail("Error while reading CSV file");
        }
    }

    @Test
    void isHeadersLineOfDataSetCorrect() {
        ImporterCSV importer = new ImporterCSV("fitness_exercises.csv");
        try {
            var data = importer.readCSV();
            var lastLine = data.get(0).split(",");
            assertEquals("bodyPart", lastLine[0]);
            assertEquals("equipment", lastLine[1]);
            assertEquals("gifUrl", lastLine[2]);
            assertEquals("id", lastLine[3]);
            assertEquals("name", lastLine[4]);
            assertEquals("target", lastLine[5]);
        } catch (Exception e) {
            e.printStackTrace();
            fail("Error while reading CSV file");
        }
    }
}