Feature: MyBooking

  Scenario: Authorized user see their booking list
  
    Given I visit the website
    And I logged in with email value "iamoyua@gmail.com" and password value "Pa$$word"
    Then I should see my booking button
    When I click my booking button
    Then I should see my booking page

Scenario: Authorized user cancel a booking list
  
    Given I visit the website
    And I logged in with email value "iamoyua@gmail.com" and password value "Pa$$word"
    Then I should see my booking button
    When I click my booking button
    Then I should see my booking page
    And I should see my reserved booking list
    When I click on a cancel button of a booking card
    Then I should see a cancel booking dialog
    And I should see a cancel booking button
    When I click on a cancel booking button
    Then I should see a cancel booking list