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
        charList.get(4).evaluate('actor.type').then(function(bidingValue){
            expect(bidingValue).toBe('player');
        });
        charList.get(5).evaluate('actor.type').then(function(bidingValue){
            expect(bidingValue).toBe('monster');
        });

    });

    it('Shoud type characters and monster name',function(){

        var charList = element.all(by.repeater('actor in actors'));

        var input0 = charList.get(0).element(by.className('actor__name')).sendKeys('Player 0');

        var input1 = charList.get(1).element(by.className('actor__name')).sendKeys('Player 1');

        var input2 = charList.get(2).element(by.className('actor__name')).sendKeys('Player 2');

        var input3 = charList.get(3).element(by.className('actor__name')).sendKeys('Monster 0');

        var input4 = charList.get(4).element(by.className('actor__name')).sendKeys('Player 3');

        var input5 = charList.get(5).element(by.className('actor__name')).sendKeys('Monster 1');

        expect(input0.getAttribute('value')).toBe('Player 0');
        expect(input1.getAttribute('value')).toBe('Player 1');
        expect(input2.getAttribute('value')).toBe('Player 2');
        expect(input3.getAttribute('value')).toBe('Monster 0');
        expect(input4.getAttribute('value')).toBe('Player 3');
        expect(input5.getAttribute('value')).toBe('Monster 1');
    });

    it('Shoud type the initiative numbers and reorder the characters',function(){

        var charList = element.all(by.repeater('actor in actors'));

        var input0 = charList.get(0).element(by.className('actor__init')).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys('10');

        var input1 = charList.get(1).element(by.className('actor__init')).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys('22');

        var input2 = charList.get(2).element(by.className('actor__init')).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys('7');

        var input3 = charList.get(3).element(by.className('actor__init')).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys('15');

        var input4 = charList.get(4).element(by.className('actor__init')).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys('14');

        var input5 = charList.get(5).element(by.className('actor__init')).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys('12');

        expect(input0.getAttribute('value')).toBe('10');
        expect(input1.getAttribute('value')).toBe('22');
        expect(input2.getAttribute('value')).toBe('7');
        expect(input3.getAttribute('value')).toBe('15');
        expect(input4.getAttribute('value')).toBe('14');
        expect(input5.getAttribute('value')).toBe('12');

        element(by.linkText('Calc initiative')).click().then(function(){
            var charList = element.all(by.repeater('actor in actors'));

            expect(charList.get(0).element(by.className('actor__init')).getAttribute('value')).toBe('22');
            expect(charList.get(1).element(by.className('actor__init')).getAttribute('value')).toBe('15');
            expect(charList.get(2).element(by.className('actor__init')).getAttribute('value')).toBe('14');
            expect(charList.get(3).element(by.className('actor__init')).getAttribute('value')).toBe('12');
            expect(charList.get(4).element(by.className('actor__init')).getAttribute('value')).toBe('10');
            expect(charList.get(5).element(by.className('actor__init')).getAttribute('value')).toBe('7');
        });

    });

    it('Shoud drag the first character to the 3rd position',function(){

        // var charList = element.all(by.repeater('actor in actors'));
        // var elem = charList.get(0);
        //
        // browser.actions().
        // mouseMove(elem, {x: 100, y: 20}).
        // mouseDown().perform();
        //
        // browser.sleep(1000);
        //
        // browser.actions().
        // mouseMove( {x: 100, y: 40}).
        // mouseUp().
        // perform();
        //
        // browser.sleep(1000);
        //
        // ----------------------

        // var elem = charList.get(0);
        // var target = charList.get(3);
        // browser.driver.actions().dragAndDrop(elem,target).mouseUp().perform();

        //expect(charList.get(0).element(by.className('actor__init')).getAttribute('value')).toBe('12');

    });
    it('Shoud delete the second character',function(){});


});
