Project 8: Automating Tests Relating to Ordering a Taxi from the Urban.Routes App

Author: Quinn Burt

Description: This project covers several pieces of functionality for the Urban.Routes App. It tests filling out the from and to fields, selecting the Supportive plan, filling out the phone number field, adding a credit card, adding a message to the driver, adding a blanket and handkerchief to the requirements, adding two ice creams to the requirements, and confirms the car search modal appears when ordering a taxi.

Technologies Used: Primarily WDIO, an awesome package for automating web tests. The tests were performed on Firefox 122.0.1 (64-bit) and Google Chrome Version 121.0.6167.184 (Official Build) (64-bit)

Instructions: Using VSCode or the terminal, navigate to the project directory and run the command 'npm run wdio'.

Extra: There is currently a bug in Urban.Routes that I found while designing these tests. When attempting to order a taxi with the "Supportive" plan selected, the server responds with a status code of '500' and the error 'UnexpectedError'. As a result, I needed to add a section to my order test (test 9) that selected the business plan before clicking the order button, due to the site saving plan selection in the cookies.