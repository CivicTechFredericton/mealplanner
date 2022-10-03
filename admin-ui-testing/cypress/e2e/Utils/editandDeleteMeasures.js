import editandDeleteMeasuresPage from "../Pages/editandDeleteMeasuresPage.js"
const editandDeleteMeasures = new editandDeleteMeasuresPage();

Cypress.Commands.add('EditMeasure', (data) => {

    editandDeleteMeasures.clickMeasuresonMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'Green Bell Pepper').within(() => {

        //click 'Edit' of Measures
        cy.contains("Edit").click({ force: true });
        cy.url().should('include', "/measures/")
        cy.wait(1000)
        editandDeleteMeasures.InputmeasuringQunatity().clear().type(data.editQuantity)
        editandDeleteMeasures.InputmeasuringUnit().clear().type(data.editUnit)
        editandDeleteMeasures.clickSaveBtn().click()
        cy.contains("Element updated").should('be.visible')

    })
});

Cypress.Commands.add('DeleteMeasure', (data) => {

    editandDeleteMeasures.clickMeasuresonMenu().click()

    cy.get("table tbody tr").wait(1000).contains('tr', 'Green Bell Pepper').within(() => {

        //Delete the measures
        editandDeleteMeasures.selectcheckbox().click({ force: true })

    })
})