Feature: Login

  Scenario: User successfully login
  
    Given I visit the website
    And I should see a "Login" button
    When I click on "landing-page-login-button"
    Then I should see a page with title "Hello ! Welcome Back"
    And I fill in the "login-form-email-input" field with value "xxx+user1@example.com"
    And I fill in the "login-form-password-input" field with value "Pa$$word"
    When I login
    Then I should see a page with title "Make My Booking"

  Scenario: User failed to login due to missing required data

    Given I visit the website
    And I should see a "Login" button
    When I click on "landing-page-login-button"
    Then I should see a page with title "Hello ! Welcome Back"
    When I click on "login-form-login-button"
    Then I should see a message "Email is required"
    And I should see a message "Password is required"

  Scenario: User failed to login due to incorrect email or password

    Given I visit the website
    And I should see a "Login" button
    When I click on "landing-page-login-button"
    Then I should see a page with title "Hello ! Welcome Back"
    And I fill in the "login-form-email-input" field with value "xxx+user1@example.com"
    And I fill in the "login-form-password-input" field with value "password"
    When I click on "login-form-login-button"
    Then I should see a message "Incorrect username or password. Please try again."