describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('login', () => {
    cy.visit('http://localhost:3000')
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#header button[data-bs-toggle="dropdown"] span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('button.form-Button-Swal').click();
    
  })

  it('loginpid', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('arai');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
          
    
  })

  it('full login', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    
    cy.get('#root button.btn-danger').click();
          
    
  })

  it('login admin', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.get('#root form.login-form div:nth-child(3)').click();
    // cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('carol123');
    cy.get('#root button.btn-danger').click();
          
    
  })

})