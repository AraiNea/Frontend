describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
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

  it('Search pizza -> pizzu', () => {
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

  it('fillter price', () => {
    cy.visit('http://localhost:3000')
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .should('have.attr', 'href', '/search');
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .click();
    cy.get('#root button.btn-light').click();
    cy.get('#root input[placeholder="Min"]').click();

    cy.get('#root input[placeholder="Min"]').type('100');
    cy.get('#root input[placeholder="Max"]').click();
    cy.get('#root input[placeholder="Max"]').type('300');
    cy.get('#root button.text-white').click();
      
    
  })

  it('fillter price and stock', () => {
    cy.visit('http://localhost:3000')
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .should('have.attr', 'href', '/search');
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .click();
    cy.get('#root button.btn-light').click();
    cy.get('#root input[placeholder="Min"]').click();

    cy.get('#root input[placeholder="Min"]').type('100');
    cy.get('#root input[placeholder="Max"]').click();
    cy.get('#root input[placeholder="Max"]').type('300');
    cy.get('#inStockCheck').check();
    cy.get('#root button.text-white').click();
      
    
      
    
  })

  it('pizza and fillter price and stock', () => {
    cy.visit('http://localhost:3000')
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .should('have.attr', 'href', '/search');
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .click();
    cy.get('input.form-control[placeholder="Search..."]')
      .type('Pizza', { force: true });
    cy.get('#root button.btn-light').click();
    cy.get('#root input[placeholder="Min"]').click();

    cy.get('#root input[placeholder="Min"]').type('100');
    cy.get('#root input[placeholder="Max"]').click();
    cy.get('#root input[placeholder="Max"]').type('300');
    cy.get('#inStockCheck').check();
    cy.get('#root button.text-white').click();
      
    
      
    
  })
})