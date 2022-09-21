import multipleuserslogintestdata from '../fixtures/multipleuserslogintestdata.json';


describe('Validate Multiple UsersLogin', function () {
   
    it('Validate Multiple Users successful Login', function () {

        cy.get(multipleuserslogintestdata).each((param) => {
            cy.visit('/')
            cy.get('[data-testid="username-textField"] input').type(param.username)
            cy.get('[data-testid="password-textField"] input').type(param.password)
            cy.get('[data-testid="login-button"]').click({ multiple: true })
            cy.url().should('include', '/mealplans')
            cy.get('[data-testid="current-user"]').contains(param.user);
            cy.logout()
            cy.wait(1000)

        })
       
    });

    it("Testing the only single input sign in [ Should not be possible ]",()=>{
        cy.visit("/");
        cy.get('[data-testid="username-textField"] input').type(" ");
        cy.get('[data-testid="password-textField"] input').type("ba7c51282320843");
        cy.get('[data-testid="login-button"]').click();
       // cy.contains("Wrong Credentials").should('be.visible');
    })

    it("Testing with invalid credentials [ Should not be possible ]",()=>{
        cy.visit("/");
        cy.get('[data-testid="username-textField"] input').type("Johnce");
        cy.get('[data-testid="password-textField"] input').type("John123");
        cy.get('[data-testid="login-button"]').click();
        cy.url().should('include','/login');
        cy.contains("Wrong Credentials").should('be.visible');
    })


})