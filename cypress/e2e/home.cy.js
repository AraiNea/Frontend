describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('click pizza', () => {
    cy.visit('http://localhost:3000')
    cy.get('a.nav-link.active').click()
    cy.get('img[alt="BaconHam Cheese"]').click()
    cy.get('.form-select').select('5') 
    cy.contains('button', 'Add to Cart').click()
    


    




  })

  it('category pizza', () => {
    cy.visit('http://localhost:3000')
    cy.contains('a', 'Category').click()
    cy.contains('.category-title', 'pizza').click()
    cy.contains('h5', 'BBQ Smoked').should('be.visible')
    cy.contains('h5', 'BBQ Smoked').click()
    cy.get('select.form-select').select('3') 
    cy.contains('button', 'Back').click()
    cy.contains('a', 'Category').click()
    



    


    




  })
  it('category app', () => {
    cy.visit('http://localhost:3000')
    cy.contains('a', 'Category').click()
    cy.contains('.category-title', 'appetizer').click()
    cy.contains('h5', 'Garlic Bread').should('be.visible')
    cy.contains('h5', 'Garlic Bread').click()

    



    


    




  })
  it('category drink', () => {
    cy.visit('http://localhost:3000')
    cy.contains('a', 'Category').click()
    cy.contains('.category-title', 'drink').click()
    cy.contains('h5', 'Water').should('be.visible')
    cy.contains('h5', 'Water').click()

  })

  it('Search', () => {
    cy.visit('http://localhost:3000')
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .should('have.attr', 'href', '/search');
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .click();
    cy.get('input.form-control[placeholder="Search..."]')
      .type('Pizza', { force: true });
    
      
    
  })

})