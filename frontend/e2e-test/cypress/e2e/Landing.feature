Feature: Landing

  Scenario: Unauthorized user visit the website
  
    When I visit the website
    Then I should see a landing page with a signin button and signup button