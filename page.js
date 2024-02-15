module.exports = {
    //Addresses
    fromAddress: 'East 2nd Street, 601',
    toAddress: '1300 1st St',
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    phoneCodeField: '#code',
    cardCodeField: '[name=code]',
    numberField: '#number',
    messageField: '#comment',
    bAndHBool: '.switch-input',
    iceCreamCounter: '.counter-value',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    suppInfoButton: '[data-for=tariff-card-4]',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    paymentMethodButton: '.pp-value',
    addCardButton: '.pp-plus-container',
    linkCardButton: 'button=Link',
    cardCloseButton: '.payment-picker.open > .modal > .section.active > .close-button.section-close',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    orderButton: '.smart-button',
    // Dropdowns
    requirementsDropdown: '.reqs-header',
    //Switches
    bAndHSwitch: '.slider.round',
    //Counters
    iceCreamPlus: '.counter-plus',
    // Modals
    phoneNumberModal: '.modal',
    paymentModal: '.modal.unusual',
    carSearchModal: '.order.shown',
    // Functions
    fillAddresses: async function() {
        const fromField = await $(this.fromField);
        await fromField.setValue(this.fromAddress);
        const toField = await $(this.toField);
        await toField.setValue(this.toAddress);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.phoneCodeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addCreditCard: async function(closeModal=false) {
          //Click payment method field
          const paymentMethodButton = await $(this.paymentMethodButton);
          await paymentMethodButton.waitForDisplayed();
          await paymentMethodButton.click();
          //Click add card button
          const addCardButton = await $(this.addCardButton);
          await addCardButton.waitForDisplayed();
          await addCardButton.click();
          //Wait for payment modal to display
          const paymentModal = await $(this.paymentModal);
          await paymentModal.waitForDisplayed();
          //Enter arbitrary CVV code
          const codeField = await $(this.cardCodeField);
          await codeField.waitForDisplayed();
          await codeField.click();
          await codeField.setValue('123');
          //Enter card number
          const numberField = await $(this.numberField);
          await numberField.waitForDisplayed();
          await numberField.setValue('123400004321');
          //Click on modal to exit focus
          await paymentModal.click();
          //Click link
          const linkCardButton = await $(this.linkCardButton);
          await linkCardButton.waitForDisplayed();
          await linkCardButton.click();
          //If closeModal is true, we click the X button
          if (closeModal){
            const cardCloseButton = await $(this.cardCloseButton);
            await paymentModal.waitForDisplayed();
            await cardCloseButton.click();
          }
    },
    fillMandatoryFields: async function() {
        await this.fillAddresses();
        await this.submitPhoneNumber('+12345670000');
        await this.addCreditCard(true);
    }
};