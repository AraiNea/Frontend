describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  it('click herosection',()=>{
    cy.visit('http://localhost:3000')
    cy.get('.swiper-slide-active > .d-flex > .hero-slide-content > .hero-image').click()
    cy.get('.container > .d-flex').click()
  })
  it('slide herosection',()=>{
    cy.visit('http://localhost:3000')
    cy.get('.custom-swiper-button-prev').click()
    
  })
  it('click navbar',()=>{
    cy.visit('http://localhost:3000')
    cy.get(':nth-child(2) > .nav-link').click()
    cy.visit('http://localhost:3000/category')
    
  })
})