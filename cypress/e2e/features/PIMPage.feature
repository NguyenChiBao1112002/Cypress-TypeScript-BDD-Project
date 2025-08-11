@NCB_500
Feature: All Features In PIM Page

Background: 
    Given I open the PIM page

@NCB_512, @severity=critical
Scenario: Add Employee
    When I add employee in PIM page
    | firstname | middlename | lastname | employeeID |
    | Bao       | Chi        | Nguyen   | 2457       |
    | Vy        | Yen        | Nguyen   | 1425       |
    | Hung      |            | Tran     | 5879       |
    Then The system will switch to Personal Details Page

@NCB_513
Scenario: Search Employee
    When I enter Emloyee Information to search Employee
    | empl_name       | empl_id | job_title             | sub_unit          |
    | Sara Tencrady   | 0103    | Payroll Administrator | Human Resources   |
    | Rebecca Harmony | 0042    | QA Engineer           | Quality Assurance |
    | Russel Hamilton | 0034    | Software Engineer     | Development       |
    And I click on Search button
    Then I should see employees matching the entered criteria