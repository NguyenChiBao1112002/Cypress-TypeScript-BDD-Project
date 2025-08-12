@NCB_357
Feature: All Features In The Admin Page

Background: 
    Given I open the admin page

@NCB_358
Scenario: Verify downloaded PDF matches expected file
    When I download the admin report PDF
    Then The downloaded PDF should exactly match the expected file

@NCB_359
Scenario: Verify downloaded PDF contains expected content
    When I download the admin report PDF
    Then The downloaded PDF should contain the expected content
    | expectedcontent |
    | neural network  |
    | neural net      |
    | ANN             |
    | NN              |

@NCB_360
Scenario: Search Users with valid information in User Managements tab
    When I enter Username as "FMLName1"
    And I enter Employee Name as "FName LName"
    And I click on Search button
    Then I should see Users matching the entered criteria