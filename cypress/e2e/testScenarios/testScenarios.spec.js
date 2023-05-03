import searchItemsPOM from "../pageObject/searchItemsPOM"

describe('Test to validate search filter', function () {
    this.beforeEach(function () {
        searchItemsPOM.homePage();
    })

    it('Validate that all fields are displayed correctly', () => {
        searchItemsPOM.title.should('be.visible');
        searchItemsPOM.countTitle.should('be.visible');
        searchItemsPOM.filterButton.should('be.visible');
        searchItemsPOM.searchBar.should('be.visible');
        searchItemsPOM.addButton.should('be.visible');
        searchItemsPOM.table.should('be.visible');
        searchItemsPOM.pageCounter.should('be.visible');
        searchItemsPOM.nexPage.should('be.visible');
    })

    it('Trying to edit a laptop inserting the wrong date format', () => {
        searchItemsPOM.searchBar.type('Commodore 64');
        searchItemsPOM.filterButton.click();
        searchItemsPOM.selectElmentByName('Commodore 64');
        searchItemsPOM.editIntroducedField.type('08-01-1982');
        searchItemsPOM.saveComputer.click();
        searchItemsPOM.getValidationMessage(searchItemsPOM.editIntroducedField).should('contain.text', 'java.time.format.DateTimeParseException');
    })

    it('try to add a date of introduction greater than the date of Discontinued', () => {
        searchItemsPOM.searchBar.type('Commodore 64');
        searchItemsPOM.filterButton.click();
        searchItemsPOM.selectElmentByName('Commodore 64');
        searchItemsPOM.editIntroducedField.clear();
        searchItemsPOM.editIntroducedField.type('2024-01-01');
        searchItemsPOM.saveComputer.click();
        searchItemsPOM.getValidationMessage(searchItemsPOM.editDiscontinuedField).should('contain.text', 'Discontinued date is before introduction date');
    })

    it('validate that the name and date of introduction of a laptop can be edited correctly', () => {
        searchItemsPOM.searchBar.type('Commodore 64');
        searchItemsPOM.filterButton.click();
        searchItemsPOM.selectElmentByName('Commodore 64');
        searchItemsPOM.editDiscontinuedField.clear();
        searchItemsPOM.editDiscontinuedField.type('2024-01-01');
        searchItemsPOM.saveComputer.click();
        searchItemsPOM.alert.contains('Done ! Computer Commodore 64 has been updated').should('be.visible');
    })

    it('Filter computer list by “HP” and create a map of the returned data', () => {
        searchItemsPOM.searchBar.type('HP');
        searchItemsPOM.filterButton.click();
        searchItemsPOM.getMap();
        searchItemsPOM.table.should('be.visible');
    })

    it('Filter computer list by IBM and return a list of computer names on the LAST page of the results', () => {
        searchItemsPOM.searchBar.type('IBM');
        searchItemsPOM.filterButton.click();
        searchItemsPOM.goTolastPage();
        searchItemsPOM.getListName();
        searchItemsPOM.table.should('be.visible');
    })

    it('validate that a new computer can be added', () => {
        searchItemsPOM.addButton.click();
        searchItemsPOM.editNameField.type('Android');
        searchItemsPOM.editIntroducedField.type('2008-08-01');
        searchItemsPOM.editDiscontinuedField.type('2013-08-01');
        searchItemsPOM.editCompanyField.select('Evans & Sutherland');
        searchItemsPOM.createComputer.click();
        searchItemsPOM.alert.contains('has been created').should('be.visible');


    })







})