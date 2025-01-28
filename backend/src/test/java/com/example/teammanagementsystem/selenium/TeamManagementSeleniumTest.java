package com.example.teammanagementsystem.selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.TimeoutException;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Duration;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TeamManagementSeleniumTest {
    
    @LocalServerPort
    private Integer port;
    
    private WebDriver driver;
    private WebDriverWait wait;
    private Process frontendProcess;
    private static final String FRONTEND_URL = "http://localhost:3000";

    @BeforeAll
    static void setupClass() {
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    void setUp() throws IOException, InterruptedException {
        // Kill any existing process on port 3000 (for macOS/Linux)
        try {
            ProcessBuilder killProcess = new ProcessBuilder("lsof", "-ti", ":3000");
            Process p = killProcess.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String pid = reader.readLine();
            if (pid != null) {
                Runtime.getRuntime().exec("kill -9 " + pid);
                Thread.sleep(2000);
            }
        } catch (Exception e) {
            // Ignore if process not found
        }

        // Setup ChromeDriver
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Start frontend application with working directory set
        ProcessBuilder processBuilder = new ProcessBuilder("npm", "start");
        processBuilder.directory(new File("../frontend"));
        processBuilder.redirectErrorStream(true);
        frontendProcess = processBuilder.start();

        // Redirect process output for debugging
        new Thread(() -> {
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(frontendProcess.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println("Frontend: " + line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();

        // Wait for frontend to be ready
        Thread.sleep(15000);

        // Navigate to login page
        driver.get(FRONTEND_URL);
        
        // Wait for page load
        wait.until(webDriver -> ((JavascriptExecutor) webDriver)
            .executeScript("return document.readyState").equals("complete"));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
        if (frontendProcess != null) {
            frontendProcess.destroy();
            frontendProcess.destroyForcibly(); // Ensure the process is terminated
        }
    }

    @Test
    void createTeam_ShouldCreateNewTeam() {
        // Wait for page to be fully loaded
        wait.until(webDriver -> ((JavascriptExecutor) webDriver)
            .executeScript("return document.readyState").equals("complete"));

        // Find and fill username field
        WebElement usernameInput = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.cssSelector("input[placeholder='Username']")));
        usernameInput.sendKeys("admin");

        // Find and fill password field
        WebElement passwordInput = driver.findElement(
            By.cssSelector("input[placeholder='Password']"));
        passwordInput.sendKeys("admin");

        // Find and click login button
        WebElement loginButton = driver.findElement(
            By.cssSelector(".auth-form button[type='submit']"));
        loginButton.click();

        // Wait for login to complete and dashboard to load
        wait.until(ExpectedConditions.urlContains("/dashboard"));
        
        // Print page source for debugging if needed
        System.out.println("After login page source: " + driver.getPageSource());
    }
} 