describe('template spec', () => {
  it('add item', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root button.product-btn-add').click();
    cy.get('#modalProduct div.upload-box').click();
    cy.get('#modalProduct input[type="text"]').click();
    cy.get('#modalProduct input[type="text"]').type('nampueng');
    cy.get('#modalProduct select.form-control').select('2');
    cy.get('#modalProduct div:nth-child(4) input.form-control').click();
    cy.get('#modalProduct div:nth-child(4) input.form-control').type('4');
    cy.get('#modalProduct input[value=""]').click({ multiple: true });
    cy.get('#modalProduct input[value=""]').type('10');
    cy.get('#modalProduct textarea.form-control').click();
    cy.get('#modalProduct textarea.form-control').type('ma test kab');
    cy.get('#modalProduct button.btn').click();
    cy.get('button.swal2-confirm').click();
    cy.get('button.form-Button-Swal').click();
    cy.get('#modalProduct i.upload-icon').click();
    cy.get('#modalProduct button.btn').click();
    cy.get('button.swal2-confirm').click();
    cy.get('button.form-Button-Swal').click();
        
  })

  it('add item no pictures', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root button.product-btn-add').click();
    cy.get('#modalProduct div.upload-box').click();
    cy.get('#modalProduct input[type="text"]').click();
    cy.get('#modalProduct input[type="text"]').type('nampueng');
    cy.get('#modalProduct select.form-control').select('2');
    cy.get('#modalProduct div:nth-child(4) input.form-control').click();
    cy.get('#modalProduct div:nth-child(4) input.form-control').type('4');
    cy.get('#modalProduct input[value=""]').click({ multiple: true });
    cy.get('#modalProduct input[value=""]').type('10');
    cy.get('#modalProduct textarea.form-control').click();
    cy.get('#modalProduct textarea.form-control').type('ma test kab');
    cy.get('#modalProduct button.btn').click();
    cy.get('button.swal2-confirm').click();
        
  })

  it('modify rec menu', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root tr:nth-child(1) span.slider').click();
    cy.get('#root tr:nth-child(1) label.switch input').uncheck({force: true});
    cy.get('button.form-Button-Swal').click();
    cy.get('#root tr:nth-child(1) span.slider').click();
    cy.get('#root tr:nth-child(1) label.switch input').check({force: true});
    cy.get('button.form-Button-Swal').click();
    cy.get('#root tr:nth-child(4) span.slider').click();
    cy.get('#root tr:nth-child(4) label.switch input').uncheck({force: true});
    cy.get('button.form-Button-Swal').click();
    cy.get('#root tr:nth-child(4) span.slider').click();
    cy.get('#root tr:nth-child(4) label.switch input').check({force: true});
    cy.get('button.form-Button-Swal').click();
    cy.get('#root tr:nth-child(1) button.btn-edit i.bi').click();
    cy.get('#modalProduct button.btn').click();
    cy.get('button.swal2-confirm').click();
    
  })

  it('search me', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root input.product-search-box').click();
    cy.get('#root input.product-search-box').type('nam');
    cy.get('#root div.product-table').click();
    
  })

  it('add category', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#header a[href="/categoryManagement"]').click();
    cy.get('#root button.product-btn-add').click();
    cy.get('#modalCategory i.upload-icon').click();
    cy.get('#modalCategory i.upload-icon').click();
    cy.get('#modalCategory div:nth-child(2) > input.form-control').click();
    cy.get('#modalCategory div:nth-child(2) > input.form-control').type('donly');
  
    cy.get('#modalCategory input[type="number"]').click();
    cy.get('#modalCategory input[type="number"]').type('4');
    cy.get('#modalCategory input[value=""]').click({ multiple: true });
    cy.get('#modalCategory input[value=""]').type('/eiei')
    cy.get('#modalCategory button.btn').click();
    cy.get('div.swal2-popup').click();
    cy.get('button.swal2-confirm').click();
    cy.get('button.form-Button-Swal').click();
    cy.get('#modalCategory_btnClose').click();
    // cy.get('button.form-Button-Swal').click();
    // cy.get('#modalCategory_btnClose').click();
  })

  it('modify cate', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#header a[href="/categoryManagement"]').click();
    cy.get('#root tr:nth-child(1) button.btn-edit i.bi').click({force: true} );
    cy.get('#root tr:nth-child(1) button.btn-edit i.bi').click({force: true} );
    cy.get('#modalCategory button.btn').click();
    cy.get('button.swal2-confirm').click();
    cy.get('button.form-Button-Swal').click();
    
  })

  it('ordermange', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#header a[href="/orderManagement"]').click();
    cy.get('#root tr:nth-child(1) select.status-dropdown').select('1');
    // cy.get('button.swal2-confirm').click();
    // cy.get('button.form-Button-Swal').click();
    // cy.get('#root tr:nth-child(14) button.btn').click();
    cy.get('#root tr:nth-child(4) i.bi').click();
    
  })

  it('weekly report', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
    cy.get('#header a[href="/weeklyStockReport"]').click();
    cy.get('#root input[placeholder="Start date"]').click();

    // เลือกวันเริ่ม
    cy.get('#root input[placeholder="Start date"]').click();

// เลือกวันที่ 1 (ของเดือนนี้)
cy.get('.ant-picker-dropdown .ant-picker-cell-in-view .ant-picker-cell-inner')
  .contains(/^1$/)
  .click();

// เลือกวันที่ 20 (ของเดือนนี้)
cy.get('.ant-picker-dropdown .ant-picker-cell-in-view .ant-picker-cell-inner')
  .contains(/^20$/)
  .click();
    
    
    
    
  })
})