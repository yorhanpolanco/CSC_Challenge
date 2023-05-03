class searchItems {

    homePage() {
        cy.visit('/')
        cy.url().should('include', 'computer-database.gatling.io/computers');
    }

    get title() {
        return cy.get('body > header > h1 > a')
    }

    get countTitle() {
        return cy.get('#main > h1')
    }

    get filterButton() {
        return cy.get('#searchsubmit')
    }

    get searchBar() {
        return cy.get('#searchbox')
    }

    get addButton() {
        return cy.get('#add')
    }

    get table() {
        return cy.get('#main > table')
    }

    get pageCounter() {
        return cy.get('#pagination > ul > li.current > a')
    }

    get nexPage() {
        return cy.get('#pagination > ul > li.next > a')
    }

    get pages() {
        return cy.get('#pagination > ul')
    }

    get firstColumn() {
        return this.table.find('tbody > tr > td:nth-child(1)')
    }

    get editNameField() {
        return cy.get('#name')
    }

    get editIntroducedField() {
        return cy.get('#introduced')
    }

    get editDiscontinuedField() {
        return cy.get('#discontinued')
    }

    get editCompanyField() {
        return cy.get('#company')
    }

    get deleteComputer() {
        return cy.get('#main > form.topRight > input')
    }

    get saveComputer() {
        return cy.get('#main > form:nth-child(2) > div > input')
    }

    get createComputer() {
        return cy.get('#main > form > div > input')
    }


    get cancelEdit() {
        return cy.get('#main > form:nth-child(2) > div > a')
    }

    get alert() {
        return cy.get('#main > div.alert-message.warning')
    }

    get rows() {
        return this.table.find('tbody > tr')
    }

    getValidationMessage(element) {
        return element.parent().find('span');

    }


    getMap() {
        let map = new Map();
        this.rows.each(($row, $i) => {
            map.set('Computer name ' + $i, $row.find('td:nth-child(1)').text())
            map.set('Introduced ' + $i, $row.find('td:nth-child(2)').text())
            map.set('Discontinued ' + $i, $row.find('td:nth-child(3)').text())
            map.set('Company ' + $i, $row.find('td:nth-child(4)').text())
        })

        cy.then(() => {
            map.forEach((value, key) => {
                cy.log(`${key} = ${value}`);
            });
        });
    }


    selectElmentByName(nameLaptop) {
        this.firstColumn.each(($td) => {
            if ($td.text().toLowerCase() === nameLaptop.toLowerCase()) {
                cy.log($td.text());
                cy.wrap($td).find('a').click();
                return false;
            }
        })
    }

    goTolastPage() {
        this.pages.each(($page) => {
            if ($page.find('li.next.disabled').length) {
                cy.log('This is the last page')
            } else {
                this.nexPage.click();
                this.goTolastPage();
            }
        })
    }

    getListName() {
        let names = [];
        this.firstColumn.each(($td) => {
            names.push($td.text());

        })
        cy.then(() => {
            names.forEach(($name) => {

                cy.log($name);
            })
        });

    }




} export default new searchItems