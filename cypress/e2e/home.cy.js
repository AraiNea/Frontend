describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
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
    cy.contains('h5', 'Chicken Wings').should('be.visible')
    cy.contains('h5', 'Chicken Wings').click()

    



    


    




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

  
  it('logout and rgister', () => {
    cy.contains('button.header-action-btn span', 'alice')
  .should('be.visible')
  .click();
  cy.contains('button.dropdown-item', 'Logout')
  .should('be.visible')
  .click();
  cy.get('button.swal2-confirm.btn.form-Button-Swal.me-3')
    .should('be.visible')
    .click();
  cy.contains('label', 'Username').next('input.form-control').type('nompong');
  cy.contains('label', 'Password').next('input[type="password"]').type('nmpong1234');
  cy.get('button.btn.btn-warning.w-100')
    .should('be.visible')  // ตรวจสอบว่าปุ่มเห็นได้
    .click();   
    cy.get('input[name="username"]').type('myUsername');
    cy.get('input[name="password"]').type('myPassword');
    cy.get('input[name="profileName"]')
    .should('be.visible')
    .type('Daraporn');

  // กรอกนามสกุล
  cy.get('input[name="profileSname"]')
    .should('be.visible')
    .type('Saepoo');
    // กรอก Address/Contact ข้อมูล
    cy.get('input[name="phone"]').first().type('0812345678');
    cy.get('input[name="province"]').first().type('Bangkok');
    cy.get('input[name="amphor"]').first().type('Bang Kapi');
    cy.get('input[name="district"]').first().type('Hua Mak');
    cy.get('input[name="zipCode"]').first().type('10240');
    cy.get('input[name="addrNum"]').first().type('123/45');
    cy.get('input[name="detail"]').first().type('Apartment 2B');
    cy.get('input[name="receivedName"]').first().type('Daraporn Saepoo');
  
    // ถ้ามีปุ่ม Submit / Register ให้คลิก
    cy.contains('button', 'Register')
  .should('be.visible')
  .click();
  cy.get('.swal2-container')
    .should('be.visible');

  // คลิกปุ่ม Close Window
  cy.get('button.swal2-confirm.btn.form-Button-Swal.me-3')
    .should('be.visible')
    .click();

  


  });

  it('filter', () => {
    cy.visit('http://localhost:3000')
    cy.get('a.nav-link')
      .contains('Search')         // ตรวจสอบข้อความ
      .should('have.attr', 'href', '/search');
    cy.get('body').then(($body) => {
        console.log($body.html())
    })
    cy.get('#header a[href="/search"]').click();
    cy.get('#root button.btn-light span').click();
    cy.get('#root input[placeholder="Min"]').click();
    cy.get('#root input[placeholder="Min"]').type('100');
    cy.get('#root input[placeholder="Max"]').click();
    cy.get('#root input[placeholder="Max"]').type('200');
    cy.get('#root div.gap-3').click();
    cy.get('#root button.text-white').click();
    cy.get('#root button.btn-light span').click();
    cy.get('#root input[placeholder="Min"]').click();
    cy.get('#root input[placeholder="Min"]').clear();
    cy.get('#root input[placeholder="Max"]').click();
    cy.get('#root input[placeholder="Max"]').clear();
    cy.get('#inStockCheck').check();
    cy.get('#root button.text-white').click();
    cy.get('#root button.btn-light span').click();
    cy.get('#root button.border').click();
    cy.get('#root input[placeholder="Min"]').click();
    cy.get('#root input[placeholder="Min"]').type('200');
    cy.get('#root label.d-block').click();
    cy.get('#root input[placeholder="Max"]').click();
    cy.get('#root input[placeholder="Max"]').type('300');
    cy.get('#inStockCheck').check();
    cy.get('#root button.text-white').click();
    cy.get('#root img[alt="BBQ Smoked"]').click();
    cy.get('#root select.form-select').select('3');
    cy.get('#root button.w-100').click();
    cy.get('button.form-Button-Swal').click();
    cy.get('#header input[placeholder="Search for products..."]').click();
    cy.get('#header input[placeholder="Search for products..."]').type('weter');
    cy.get('#header form.desktop-search-form i.bi').click();
    cy.get('#root button.btn-light').click();
    cy.get('#root label.form-check-label').click();
    cy.get('#inStockCheck').check();
    cy.get('#root button.text-white').click();


      


    
  })
  it('click pizza', () => {
    cy.visit('http://localhost:3000')
    cy.visit('http://localhost:3000')
    cy.get('#root img[alt="BBQ Smoked"]').click();
    cy.get('#root button.w-100').click();
    cy.get('button.form-Button-Swal').click();
    cy.get('#root button.d-flex').click();


    




  })

  // it('should check and click Cart', () => {
    
  //   // รอให้ Cart ปรากฏ
  //   cy.contains('span', 'Cart', { timeout: 10000 }).should('be.visible');

  //   // คลิกปุ่ม Cart แบบเจาะจงปุ่มแรก
  //   cy.get('button.header-action-btn').first().click();

  //   // ตรวจ badge จำนวนสินค้า
  //   cy.get('button.header-action-btn')
  //     .first()
  //     .find('span.badge')
  //     .should('be.visible')
  //     ;
  //   cy.contains('button', 'Check out').click();
  //   cy.contains('button', 'Check out').click();
    
  // });
  

  
  
  

  
  

})