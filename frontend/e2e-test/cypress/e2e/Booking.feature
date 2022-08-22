Feature: Booking

  Scenario: Authorized user successfully book a meeting room
  
    Given I visit the website
    And I logged in with email value "iamoyua@gmail.com" and password value "Pa$$word"
    Then I should see a booking page
    And I fill in the number of guest field with value 1
    And I choose the date with current date value
    And I choose the start time with value of current date at 9 AM
    And I choose the end time with value of current date at 10 AM
    When I click a find room button
    Then I should see a room list
    When I click a room card
    Then I should see a booking summary dialog
    And I should see a confirm button
    When I click on a confirm button
    Then I should see a booking confirmation page
    And I should see my booking number