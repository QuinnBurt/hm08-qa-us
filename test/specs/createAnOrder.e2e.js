const page = require('../../page');
const helper = require('../../helper')

describe('Order a taxi', () =>{
    
    it('1. Should fill the from field', async () =>{
        await browser.url(`/`);
        const fromField = await $(page.fromField);
        await fromField.setValue(page.fromAddress);
        await expect(fromField).toHaveValueContaining(page.fromAddress);
    })

    it('2. Should fill the to field', async () =>{
        await browser.url(`/`);
        const toField = await $(page.toField);
        await toField.setValue(page.toAddress);
        await expect(toField).toHaveValueContaining(page.toAddress);
    })

    it('3. Should select supportive plan', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        const supportiveButton = await helper.getElementByText('Supportive');
        //Select the info button corresponding to the Supportive tcard
        const suppInfoButton = await $(page.suppInfoButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        //Confirm the suppInfoButton is clickable to confirm the Supportive tariff is selected
        await expect(suppInfoButton).toBeClickable();
    })

    it('4. Should fill the phone number field', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.fillPhoneNumber(phoneNumber);
        await expect($(page.phoneNumberField)).toHaveValueContaining(phoneNumber);
    })

    it('5. Should add credit card', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        await page.addCreditCard();
        //Confirm card is added by checking that a saved card exists
        await expect($('[for=card-1]')).toBeExisting();
    })
    
    it('6. Should add message to the driver', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        //Select message field
        const messageField = await $(page.messageField);
        await messageField.waitForDisplayed();
        //Set message field value to 'Test'
        await messageField.setValue('Test');
        //Confirm the field contains the value
        await expect(messageField).toHaveValueContaining('Test');
    })
    
    it('7. Should add a blanket and handkerchief to requirements', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        //Select the Supportive tariff
        const supportiveButton = await helper.getElementByText('Supportive');
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        //Select the interactable element of the blanket and handkerchiefs switch
        const bAndHSwitch = await $(page.bAndHSwitch);
        await bAndHSwitch.waitForDisplayed();
        await bAndHSwitch.click();
        //Select the input element for the switch to check if it's enabled
        const bAndHBool = await $(page.bAndHBool);
        await bAndHBool.waitForExist();
        await expect(bAndHSwitch).toBeEnabled();
    })

    it('8. Should add two ice creams to the requirements', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        //Select the Supportive tariff
        const supportiveButton = await helper.getElementByText('Supportive');
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        //Select the first element of the 'counter-plus' class which happens to be the ice cream incrementer
        const iceCreamPlus = await $(page.iceCreamPlus);
        await iceCreamPlus.waitForDisplayed();
        await iceCreamPlus.click();
        await iceCreamPlus.click();
        //Select the first element of the 'counter-value' class
        const iceCreamCounter = await $(page.iceCreamCounter);
        await iceCreamCounter.waitForDisplayed();
        await expect(iceCreamCounter).toHaveText('2');
    })

    it('9. Should display the car search modal', async () =>{
        await browser.url(`/`);
        await page.fillMandatoryFields();
        //Select the Business tariff
        const businessButton = await helper.getElementByText('Business');
        await businessButton.waitForDisplayed();
        await businessButton.click();
        //Select order button and click
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        //Select the car search modal and confirm it is displayed on the page
        const carSearchModal = $(page.carSearchModal);
        await expect(carSearchModal).toBeDisplayed();
    })
})

