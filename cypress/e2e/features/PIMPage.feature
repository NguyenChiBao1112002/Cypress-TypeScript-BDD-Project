@NCB_500
Feature: All Features In PIM Page

Background: 
    Given I open the PIM page

@NCB_512
Scenario: Add Employee
    When I add employee in PIM page
    | firstname | middlename | lastname | employeeID |
    | Bao       | Chi        | Nguyen   | 2457       |
    | Vy        | Yen        | Nguyen   | 1425       |
    | Hung      |            | Tran     | 5879       |
    Then The system will switch to Personal Details Page
