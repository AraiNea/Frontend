describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  it('click herosection',()=>{
    cy.visit('http://localhost:3000')
    cy.get('.swiper-slide-active > .d-flex > .hero-slide-content > .hero-image').click({ force: true })
    cy.get('.container > .d-flex').click({ force: true })
  })
  it('slide herosection',()=>{
    cy.visit('http://localhost:3000')
    cy.get('.custom-swiper-button-prev').click({ force: true })
    
  })
  it('click navbar',()=>{
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(2) > .nav-link').click({ force: true })
    cy.visit('http://localhost:3000/category')
    
  })

  it('click pizza',()=>{
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(1) > .row > :nth-child(1) > .card > .card-body').click({ force: true })
    cy.visit('http://localhost:3000/product/1')
    cy.get('.container > .d-flex').click({ force: true })
    
  })
})