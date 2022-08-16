Feature: Signing up 

  Scenario: User successfully sign up
  
    Given I visit the website
    And I see a sign up button
    When I click on a sign up button
    Then I see a sign up page
    And I fill in the email field with value "iamoyua@gmail.com"
    And I fill in the password field with value "Pa$$word"
    When I click a create new account button
    Then I should see a make booking page

  Scenario: User failed to sign up due to missing required data

    Given I visit the website
    And I see a sign up button
    When I click on a sign up button
    Then I see a sign up page
    When I click a create new account button
    Then I should see an error message "Email is required"
    And I should see an error message "Password is required"

  Scenario: User failed to sign up due to duplicated email
  
    Given I visit the website
    And I see a sign up button
    When I click on a sign up button
    Then I see a sign up page
    And I fill in the email field with value "iamoyua@gmail.com"
    And I fill in the password field with value "Pa$$word"
    When I click a create new account button
    Then I should see an error message "You failed to sign up"