@NCB_554
Feature: All Features In The My Info Page

Background: 
    Given I open the My Info page

@NCB_555
Scenario: User updates their personal details successfully
    When the user updates their name to "Manda Akhil User"
    And updates employee ID to "6969"
    And updates other ID to "4957589"
    And sets the driver's license number to "EBHPA66779"
    And sets nationality to "Indian"
    And sets marital status to "Other"
    And selects gender as "Male"
    And clicks the Save button
    Then the form should be submitted successfully

