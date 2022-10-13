import testdata from "../fixtures/testdata.json";
import registerUsertestdata from "../fixtures/registerUsertestdata.json"

describe('RegisterNewUser', () => {
    
    beforeEach(function () {
        cy.login(testdata);
    });

    it('RegisterNewUser', function () {
        cy.RegisterUser(registerUsertestdata)
    });

    it('DownloadRegisteredUsers', function (){
        cy.DownloadUsers()
    })

    it('Validate successful Logout', function () {
        cy.logout()
    })

})