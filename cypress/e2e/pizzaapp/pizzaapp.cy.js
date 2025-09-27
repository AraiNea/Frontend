describe('Navbar navigation', () => {
    it('clicks the 3rd nav-link', () => {
      
      cy.visit('http://localhost:3000/')
      
      
      cy.get(':nth-child(3) > .nav-link', { timeout: 10000 })
        .should('be.visible')  
        .click({force: true})
      cy.get('.form-control').type('Water', { force: true })
      cy.get('.py-3').click({ force: true })
      cy.get(':nth-child(1) > .nav-link').click({force: true})
      cy.get(':nth-child(3) > .nav-link', { timeout: 10000 })
        .should('be.visible')  
        .click({force: true})
      cy.get('.form-control').type('BBQ', { force: true })



    })
  })
