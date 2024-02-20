Project 8: Automating Tests Relating to Ordering a Taxi from the Urban.Routes App

Author: Quinn Burt

Description: This project covers several pieces of functionality for the Urban.Routes App. The tests range from filling out a field to ensuring the car search modal displays when an order is placed.

Setup: Install Node.js and NPM. Deploy the Urban.Routes test server and replace the 'baseUrl' parameter in the wdio.conf.js with the test server url.

Configuration: This project is configured to run the tests on Google Chrome and Firefox in headless mode. The url of the test server is included in the config for convenience
and legibility of code.

Running the Tests: To run the tests, simply open the terminal and navigate to the hm08-qa-us directory and run the command "npm run wdio".

Test Cases: 1. Should fill the from field 
            2. Should fill the to field
            3. Should select the supportive plan
            4. Should fill the phone number field
            5. Should add credit card
            6. Should add message to driver
            7. Should add a blanket and handkerchief to the requirements
            8. Should add two ice creams to the requirements
            9. Should display the car search modal

Code Style: The project is written in Javascript, primarily utilizing the WebdriverIO package. A page.js file and helper.js file were created to keep track of selectors
and hold useful functions used in several of the test cases.