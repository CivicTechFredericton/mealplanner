import smoketestdata from "../fixtures/smoketestdata.json";
import { v4 as uuidv4 } from "uuid";

describe('Smoke test', function () {
    const uniqueId = uuidv4();

    it('Validate successful smoke test', function () {
        cy.smoketest(smoketestdata, uniqueId)
    });

    // it('Validate successful Logout', function () {
    //     cy.logout()
    // })

})