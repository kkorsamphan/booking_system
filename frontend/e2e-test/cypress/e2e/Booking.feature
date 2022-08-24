Feature: Booking

  Scenario: Authorized user successfully book a meeting room
  
    Given I visit the "/login" page
    Then I fill in the "login-form-email-input" field with value "xxx+user1@example.com"
    And I fill in the "login-form-password-input" field with value "Pa$$word"
    When I login
    Then I should see a page with title "Make My Booking"
    And I fill in the "find-room-form-guest-number" field with value "1"
    And I choose the date with current date value
    And I choose the start time with value of current date at 9 AM
    And I choose the end time with value of current date at 10 AM
    When I click on a Find Room button to search
    Then I should see "booking-page-room-available-room-list"
    When I click on a room card
    Then I should see "booking-dialog"
    And I should see a "Confirm Booking" button
    When I click on "booking-dialog-confirm-button"
    Then I should see a page with title "Booking Successful"
    And I should see my booking number