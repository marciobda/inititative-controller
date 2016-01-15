describe('Protractor Demo App', function() {

    browser.get('http://0.0.0.0:8000/app/');

    it('Should have a Title', function () {
        expect(browser.getTitle()).toEqual('Initiative Controller');
    });

    it('Should have a body Title', function () {
        var title = element(by.css('h1'));
        expect(title.getText()).toBe('RPG Initiative Controller');
    });

    it('Should have 3 specific buttons', function () {
        var buttonList = element(by.css('.menu-bar')).all(by.css('li .button'));
        expect(buttonList.getText()).toEqual([ 'New player', 'New monster', 'Calc initiative' ]);
    });

    it('Should create a new player and a new monster', function () {
        var charList = element.all(by.repeater('actor in actors'));

        element(by.linkText('New player')).click();
        element(by.linkText('New monster')).click();
        expect(charList.count()).toBe(6);
    });


});
