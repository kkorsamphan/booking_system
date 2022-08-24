Feature: Signing up 
  
  @signup
  Scenario: User successfully sign up
  
    Given I visit the website
    And I should see a "Sign Up" button
    When I click on "landing-page-sign-up-button"
    Then I should see a page with title "Create New Account"
    And I fill in the "sign-up-form-email-input" field with value "xxx+user2@example.com"
    And I fill in the "sign-up-form-password-input" field with value "Pa$$word"
    When I click on "sign-up-form-create-new-account-button"
    Then I should see a page with title "Make My Booking"

  Scenario: User failed to sign up due to missing required data

    Given I visit the website
    And I should see a "Sign Up" button
    When I click on "landing-page-sign-up-button"
    Then I should see a page with title "Create New Account"
    When I click on "sign-up-form-create-new-account-button"
    Then I should see a message "Email is required"
    And I should see a message "Password is required"

  Scenario: User failed to sign up due to duplicated email
  
    Given I visit the website
    And I should see a "Sign Up" button
    When I click on "landing-page-sign-up-button"
    Then I should see a page with title "Create New Account"
    And I fill in the "sign-up-form-email-input" field with value "xxx+user1@example.com"
    And I fill in the "sign-up-form-password-input" field with value "Pa$$word"
    When I click on "sign-up-form-create-new-account-button"
    Then I should see a message "You failed to sign up"