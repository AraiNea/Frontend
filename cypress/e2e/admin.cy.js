describe('template spec', () => {
  // ก่อนทุก it ให้ login และตั้ง viewport
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('test admin section',()=>{
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.get('#root input[placeholder="Value"][type="text"]').type('carol');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root tr:nth-child(1) span.slider').click();
    // cy.get('#root tr:nth-child(1) label.switch input').uncheck({ force: true });
    cy.get('button.form-Button-Swal').click();
    cy.get('#root tr:nth-child(2) td:nth-child(1) input').uncheck({ force: true });
    cy.get('button.form-Button-Swal').click({ force: true });
    cy.get('#root tr:nth-child(4) td:nth-child(1) input').check();
    cy.get('button.form-Button-Swal').click({ force: true });
    cy.get('#root input.product-search-box').click();
    cy.get('#root input.product-search-box').type('meat');
    cy.get('#root span.slider').click();
    cy.get('#root input:checked').uncheck({ force: true });
    cy.get('button.form-Button-Swal').click({ force: true });
    cy.get('#root input[type="checkbox"]').first().uncheck({ force: true });
    cy.get('button.form-Button-Swal').click({ force: true });
    cy.get('#root button.product-btn-add i.bi').click();
    cy.get('#modalProduct i.upload-icon').click();
    cy.get('#modalProduct input[type="text"]').click();
    cy.get('#modalProduct input[type="text"]').type('nampueng');
    cy.get('#modalProduct select.form-control').select('1');
    cy.get('#modalProduct div:nth-child(4) input.form-control').click();
    cy.get('#modalProduct div:nth-child(4) input.form-control').type('500');
    cy.get('#modalProduct input[value=""]').click({ multiple: true });
    cy.get('#modalProduct input[value=""]').type('10');
    cy.get('#modalProduct textarea.form-control').click();
    cy.get('#modalProduct textarea.form-control').type('test');
    cy.get('#modalProduct div.text-end').click();
    
  })
   
  it('test cate manage', () => {
    cy.visit('http://localhost:3000/productsManagement')
  cy.visit('http://localhost:3000')
  cy.get('#header span.d-none').click();
  cy.get('#header button.dropdown-item').click();
  cy.get('#root input[placeholder="Value"][type="text"]').click();
  cy.get('#root input[placeholder="Value"][type="text"]').type('carol');
  cy.get('#root input[type="password"]').click();
  cy.get('#root input[type="password"]').type('carol123');
  cy.get('#root button.btn-danger').click();
  cy.get('#header a[href="/categoryManagement"]').click();
  cy.get('#root button.product-btn-add').click();
  cy.get('#modalCategory div.upload-box').click();
  cy.get('#modalCategory div:nth-child(2) > input.form-control').click();
  cy.get('#modalCategory input[type="number"]').click();
  cy.get('#modalCategory input[type="number"]').type('3');
  cy.get('#modalCategory input[value=""]').click({ multiple: true });
  cy.get('#modalCategory button.btn').click();
  cy.get('button.swal2-confirm').click();
  cy.get('button.form-Button-Swal').click({force: true});
  cy.get('#root input.product-search-box').click({force: true});
  cy.get('#root input.product-search-box').click({force: true});
  cy.get('#root input.product-search-box')
  .type('nam', { force: true });
  cy.get('#modalCategory button.btn').click();
  cy.get('button.swal2-confirm').click();
  cy.get('button.form-Button-Swal').click({force: true});
  cy.get('#header a[href="/orderManagement"]').click({force: true});
  cy.get('#root tr:nth-child(1) select.status-dropdown').select('0', {force: true});
    
  })
  it('test Order manage', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.get('#root input[placeholder="Value"][type="text"]').type('carol');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#header a[href="/orderManagement"]').click();
    cy.get('#root tr:nth-child(1) select.status-dropdown').select('1');
    cy.get('#root input.product-search-box')
    .type('nam', { force: true });
    cy.get('#root input.product-search-box').clear();
    cy.get('#root div.product-header').click();
  
    cy.get('#root tr:nth-child(3) select.status-dropdown').select('1');
    

  })

  
    
                   
});
