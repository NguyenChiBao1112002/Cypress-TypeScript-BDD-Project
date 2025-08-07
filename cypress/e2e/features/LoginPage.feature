@NCB_123
Feature: All Features In The Login Page

  Background:
    Given I open the login page

  @NCB_124
  Scenario: Successful login
    When I login with valid credentials
    Then I should see the dashboard

  @NCB_125
  Scenario Outline: Failed login with invalid credentials
    When I login with username "<username>" and password "<password>"
    Then I should see an error message "<message>"

    Examples:
      | username | password  | message             |
      | admin    | wrongpass | Invalid credentials |
      | wrong    | admin123  | Invalid credentials |
      |          | admin123  | Required            |
      | admin    |           | Required            |
