package com.lista.tarefas;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) {
        String url = "jdbc:postgresql://localhost:5432/";
        String user = "postgres";
        String password = "senha";
        String dbName = "db_tasks";

        try (Connection connection = DriverManager.getConnection(url, user, password);
             Statement statement = connection.createStatement()) {

            // Tentar criar o banco de dados
            statement.executeUpdate("CREATE DATABASE " + dbName);
            System.out.println("Banco de dados '" + dbName + "' criado com sucesso.");

        } catch (SQLException e) {
            if (e.getMessage().contains("already exists")) {
                System.out.println("O banco de dados '" + dbName + "' já existe.");
            } else {
                e.printStackTrace();
            }
        }
    }
}
