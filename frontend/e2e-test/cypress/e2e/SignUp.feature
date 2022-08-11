Feature: Signing up 

  Scenario: User successfully sign up
  
    Given I am an unregistered user
    When I visit the website
    Then I should see a sign up button
    When I click on a sign up button
    Then I see a sign up page
    And I should see a sign up form
    And I fill in the sign up form with <email> and <password>
    When I click a create new account button
    Then I see a confirmation message