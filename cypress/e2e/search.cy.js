describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  // it('go to search', () => {
  //   cy.visit('http://localhost:3000')
  //   cy.get(':nth-child(3) > .nav-link').click({force:true})
  // })

  it('click in search', () => {
    cy.visit('http://localhost:3000/search')
    cy.get(':nth-child(1) > .row > :nth-child(1) > .card > .card-body').click({force:true})
    cy.get('.container > .d-flex').click({force:true})
    cy.get(':nth-child(1) > .row > :nth-child(2) > .card > .card-body').click({force:true})
    cy.get('.container > .d-flex').click({force:true})
    cy.get(':nth-child(1) > .row > :nth-child(3) > .card > .card-body').click({force:true})
    cy.get('.container > .d-flex').click({force:true})
  })
})