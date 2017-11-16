describe('lawsuit_app', function() {
    it('lawsuits', function() {
        browser.get('http://localhost:3000/lawsuit');

        element(by.css('.main_search>input')).sendKeys('Уголовное');
        browser.sleep(5000);
    });

    it('participant', function() {
        browser.get('http://localhost:3000/participants');
        browser.sleep(1000);
        let documentName = $$('.table tr').get(1).$$('td');

        documentName.get(0).$('input').sendKeys('TEST');
        documentName.get(2).$('input').sendKeys('TEST');
        documentName.get(3).$('input').sendKeys('TEST');
        element(by.css('.addButton')).click();

        browser.sleep(4000);
    });
});