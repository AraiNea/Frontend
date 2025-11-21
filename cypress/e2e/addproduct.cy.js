describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    
  })

  it('dppicate cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root img[alt="Recommended 3"]').click();
    cy.get('#root button.w-100').click();
  })

  it('modify cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root section:nth-child(3) div:nth-child(3) div.card div.card-body h5.mb-1').click();
    cy.get('#header button.position-relative').click();
    cy.get('#root i.bi-dash-circle').click();
    cy.get('#root i.bi-dash-circle').click();
    cy.get('#root i.bi-trash').click();
    cy.get('button.swal2-confirm').click();
  })

  it('water soldout', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type('alice');
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type('alice123');
    cy.get('#root button.btn-danger').click();
    cy.get('#root section:nth-child(3) div:nth-child(3) div.card div.card-body h5.mb-1').click();
  })
})