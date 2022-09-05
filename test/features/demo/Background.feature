# @demo
Feature: Showing how the background rule works in Cucumber

    Background: Navigate to ESPN
     Given I navigate to CNBC
     Given I navigate to ESPN

    Scenario Outline: Log into ESPN and go to basketball page
        Then I click on basketball home page

    Scenario Outline: Log into ESPN and go to football page
        Then I click on football home page
