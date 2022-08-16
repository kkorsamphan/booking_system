Feature: Landing

  Scenario: Unauthorized user visit the website
  
    Given I visit the website
    And I should see a landing page with a signin button and signup button