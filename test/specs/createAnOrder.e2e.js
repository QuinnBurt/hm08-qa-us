const page = require('../../page');
const helper = require('../../helper')

describe('Order a taxi', () =>{
    
    it('should fill the from field', async () =>{
        await browser.url(`/`);
        const fromField = await $(page.fromField);
        await fromField.setValue(page.fromAddress);
        await expect(fromField).toHaveValueContaining(page.fromAddress);
    })

    it('should fill the to field', async () =>{
        await browser.url(`/`);
        const toField = await $(page.toField);
        await toField.setValue(page.toAddress);
        await expect(toField).toHaveValueContaining(page.toAddress);
    })

    it('should select supportive plan', async () =>{
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

    it('should fill the phone number field', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.fillPhoneNumber(phoneNumber);
        await expect($(page.phoneNumberField)).toHaveValueContaining(phoneNumber);
    })

    it('should add credit card', async () =>{
        await browser.url(`/`);
        await page.fillAddresses();
        await page.addCreditCard();
        //Confirm card is added by checking that
        await expect($('[for=card-1]')).toBeExisting();
    })
    
    it('should add message to the driver', async () =>{
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
    
    it('should add a blanket and handkerchief to requirements', async () =>{
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

    it('should add two ice creams to the requirements', async () =>{
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

    /*
    There appears to be a bug on the Urban.Routes server used for this project that causes the order window to only appear EXTREMELY briefly.
    This happened while using wdio AND while testing manually, on both Google Chrome and Firefox. As a result, the final test sometimes passes and sometimes fails.
    */
    it('should display the car search modal', async () =>{
        await browser.url(`/`);
        await page.fillMandatoryFields();
        //Select order button and click
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
        //Select the car search modal and confirm it is displayed on the page
        const carSearchModal = $(page.carSearchModal);
        await expect(carSearchModal).toBeDisplayed();
    })
})

