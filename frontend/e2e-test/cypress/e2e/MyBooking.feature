Feature: MyBooking

  Scenario: Authorized user see their booking list
  
    Given I visit the "/login" page
    Then I fill in the "login-form-email-input" field with value "xxx+user1@example.com"
    And I fill in the "login-form-password-input" field with value "Pa$$word"
    When I login
    Then I should see a "My Bookings" button
    When I click on "booking-page-my-bookings-button"
    Then I should see a page with title "My Booking History"
    And I should see "my-booking-page-reserved-list"

  @cancel_booking
  Scenario: Authorized user cancel a booking list
  
    Given I visit the "/login" page
    Then I fill in the "login-form-email-input" field with value "xxx+user1@example.com"
    And I fill in the "login-form-password-input" field with value "Pa$$word"
    When I login
    Then I should see a "My Bookings" button
    When I click on "booking-page-my-bookings-button"
    Then I should see a page with title "My Booking History"
    And I should see "my-booking-page-reserved-list"
    When I click on a cancel button of a booking card
    Then I should see "cancel-booking-dialog"
    And I should see a "Yes, cancel booking" button
    When I click on "cancel-booking-dialog-confirm-button"
    Then I should see "my-booking-page-cancelled-list"


