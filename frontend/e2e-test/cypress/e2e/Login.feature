Feature: Login

  Scenario: User successfully login
  
    Given I visit the website
    And I see a login button
    When I click on a login button
    Then I see a login page
    And I fill in the email field with value "iamoyua@gmail.com"
    And I fill in the password field with value "Pa$$word"
    When I click a login button
    Then I should see a make booking page

  Scenario: User failed to login due to missing required data

    Given I visit the website
    And I see a login button
    When I click on a login button
    Then I see a login page
    When I click a login button
    Then I should see an error message "Email is required"
    And I should see an error message "Password is required"

  Scenario: User failed to login due to incorrect email or password

    Given I visit the website
    And I see a login button
    When I click on a login button
    Then I see a login page
    And I fill in the email field with value "iamoyua@gmail.com"
    And I fill in the password field with value "password"
    When I click a login button
    Then I should see an error message "Incorrect username or password. Please try again."