import editandDeleteMeasuresPage from "../Pages/editandDeleteMeasuresPage.js"
const editandDeleteMeasures = new editandDeleteMeasuresPage();

// Opens the Measures Edit
Cypress.Commands.add('OpenMeasureToEdit', () => {
  editandDeleteMeasures.clickMeasuresonMenu().click();
  cy.url().should('include', '/measures')
  cy.get('table tbody tr')
    .wait(1000)
    .contains('tr', 'Green Bell Pepper')
    .within(() => {
      //click 'Edit' of Measures
      cy.contains('Edit').click({ force: true });
      cy.url().should('include', '/measures/');

    });
});

//Changes Measures quantities
Cypress.Commands.add('EditMeasure', (data) => {

  editandDeleteMeasures.InputmeasuringQunatity().clear().type(data.editQuantity)
  editandDeleteMeasures.InputmeasuringUnit().clear().type(data.editUnit)

  editandDeleteMeasures.InputProduct().type(data.editProduct)
  editandDeleteMeasures.selectProduct().each(function ($ele, index, $list){
      if($ele.text().includes("Nutrela 100% Vegetarian Soya Granule")) {
          cy.wrap($ele).click()
      }
      else {
          cy.log($ele.text())
      }
  })
  editandDeleteMeasures.InputMeal().type(data.editMeal)
  editandDeleteMeasures.SelectMeal().each(function ($ele, index, $list){
      if($ele.text().includes("Millet Dosa")) {
          cy.wrap($ele).click()
      }
      else {
          cy.log($ele.text())
      }
  })
  editandDeleteMeasures.clickSaveBtn().click()
  cy.contains("Element updated").should('be.visible')

});

//Select Checkbox to Delete Measures
Cypress.Commands.add('SelectCheckboxToDeleteMeasure', (data) => {

  editandDeleteMeasures.clickMeasuresonMenu().click()
  cy.url().should('include', '/measures')
  cy.get("table tbody tr").wait(1000).contains('tr', 'Green Bell Pepper').within(() => {


     //Select checkbox of User and click click UnSelect
     editandDeleteMeasures.selectcheckbox().click({ force: true })
    
  })
});

//Click CloseIcon To Select UnSelect Checkbox of a Selected Measure
Cypress.Commands.add('UnSelectCheckboxOfaMeasure', (data) => {

     //clear(UnSelect) Delete Users
     editandDeleteMeasures.clickcloseIcon().click()

});

//Click DeleteIcon To Delete the Selected Measure
Cypress.Commands.add('ClickDeleteIconToDeleteaMeasure', (data) => {

     editandDeleteMeasures.clickDeleteIcon().click()
     cy.contains("Element deleted").should('be.visible')

});
