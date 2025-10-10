describe('Navbar navigation', () => {
    it('checks backend is reachable before testing UI', () => {
      cy.request('http://localhost:8080/home').then((res) => {
        expect(res.status).to.eq(200)
      })
    })

    it('clicks the 3rd nav-link', () => {
      
      cy.visit('http://localhost:3000/')
      
      
      cy.get(':nth-child(3) > .nav-link', { timeout: 10000 })
        .should('be.visible')  
        .click({force: true})
      cy.get('.form-control').first().type('Water', { force: true })
      cy.get('.py-3').click({ force: true })
      cy.get(':nth-child(1) > .nav-link').click({force: true})
      cy.get(':nth-child(3) > .nav-link', { timeout: 10000 })
        .should('be.visible')  
        .click({force: true})
      cy.get('.form-control').type('BBQ', { force: true })



    })
  })
