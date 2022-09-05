Feature: Regular Expression

    Regular Expression Demo with Examples

    @demo
    Scenario Outline: Regular Expression Demo
        Given As an <User> I login to inventory web app
            | League | Team     | Player         |
            | NFL    | Chargers | Justin Herbert |
        Given I should not navigate to ESPN page

        Examples:
            | TestID | UsersNames              |
            | RegEx1 | standard_user           |
            | RegEx2 | locked_out_user         |
            | RegEx3 | problem_user            |
            | RegEx4 | performance_glitch_user |


