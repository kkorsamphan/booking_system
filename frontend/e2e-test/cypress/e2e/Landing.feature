Feature: Landing

  Scenario: Unauthorized user visit the website
  
    Given I visit the website
    Then I should see a page with title "Meeting Room Booking"
    And I should see a "Login" button
    And I should see a "Sign Up" button