Feature: Web Interactions

    @demo
    Scenario Outline: Demo Web Interactions
        Given A web page is opened
        When Perform web interactions


        Examples:
            | TestID    |
            | WEB_TC002 |

    @demo
    Scenario Outline: Demo Web Interactions
        Given A web page is opened drop-down
        When Perform web interactions drop-down


        Examples:
            | TestID    |
            | WEB_TC003 |


    @demo
    Scenario Outline: Demo Web Interactions
        Given A web page is opened checkboxes
        When Perform web interactions checkboxes


        Examples:
            | TestID    |
            | WEB_TC003 |