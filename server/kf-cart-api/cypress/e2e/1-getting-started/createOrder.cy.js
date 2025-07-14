/// <reference types="cypress" />
describe('Order API - Create Order ', () => {   
    beforeEach(() => {});
    const baseUrl = Cypress.config('baseUrl') || 'http://localhost:3000'; // Default to localhost if not set    
    it('should create order successfully ', () => {
        
        cy.fixture('newOrder').then((newOrder) => {
            cy.request({
            method: 'POST',
            url: `${baseUrl}/api/order/save`, 
            body: newOrder, // Load the fixture file
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.custID).to.eq(newOrder.custID);
            expect(response.body.status).to.eq(newOrder.status);
            expect(response.body.amount).to.eq(newOrder.amount);
            console.log("Response Body:", response.body);
            });
        });  
    });

    it('should return error message if all mandatory fields are not sent in request ', () => {
        cy.fixture('newOrder').then((newOrder) => {
            const {productID, ...orderWithoutProduct} = newOrder; // Remove productID to simulate missing field
            cy.request({
                method: 'POST',
                url: `${baseUrl}/api/order/save`, 
                body: orderWithoutProduct,
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.body.error).to.eq('Failed to create order. Please try again later.');
            });
        });
    });
});