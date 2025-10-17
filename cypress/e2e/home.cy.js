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

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(1280, 800);

    // Login
    cy.contains('span', 'Guest').click();
    cy.contains('button.dropdown-item', 'Log In').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.contains('label', 'Password').next('input[type="password"]').type('alice123');
    cy.contains('button.btn.btn-danger', 'Sign In').click();
  });

  it('should check and click Cart', () => {
    
    // รอให้ Cart ปรากฏ
    cy.contains('span', 'Cart', { timeout: 10000 }).should('be.visible');

    // คลิกปุ่ม Cart แบบเจาะจงปุ่มแรก
    cy.get('button.header-action-btn').first().click();

    // ตรวจ badge จำนวนสินค้า
    cy.get('button.header-action-btn')
      .first()
      .find('span.badge')
      .should('be.visible')
      ;
    cy.contains('button', 'Check out').click();
    cy.contains('button', 'Check out').click();
    
  });
  
  it('logout', () => {
    cy.contains('button.header-action-btn span', 'alice')
  .should('be.visible')
  .click();
  cy.contains('button.dropdown-item', 'Logout')
  .should('be.visible')
  .click();
  


  });

  
  
  

  
  

})