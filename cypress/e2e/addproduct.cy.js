describe('template spec', () => {
  const username = 'alice';
  const password = 'alice123';

  beforeEach(() => {
    // รอ API products ก่อนทุก test
    cy.intercept('GET', '/api/products').as('getProducts');
    cy.visit('http://localhost:3000');
  });

  const login = () => {
    cy.get('#header span.d-none', { timeout: 10000 }).click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root input[placeholder="Value"][type="text"]').click();
    cy.contains('label', 'Username').next('input.form-control').type(username);
    cy.get('#root input[type="password"]').click();
    cy.get('#root input[type="password"]').type(password);
    cy.get('#root button.btn-danger').click();
    // รอ login redirect / homepage load
    cy.wait('@getProducts');
  };

  it('passes', () => {
    // test visit only
    cy.wait('@getProducts');
  });

  it('cart', () => {
    login();
    cy.get('#root img[alt="BaconHam Cheese"]', { timeout: 10000 }).should('be.visible').click();
    cy.get('#root button.w-100', { timeout: 10000 }).click();
    cy.get('button.form-Button-Swal', { timeout: 10000 }).click();
  });

  it('duplicate cart', () => {
    login();
    cy.get('#root img[alt="BaconHam Cheese"]', { timeout: 10000 }).should('be.visible').click();
    cy.get('#root button.w-100', { timeout: 10000 }).click();
    cy.get('button.form-Button-Swal', { timeout: 10000 }).click();
  });

  it('modify cart', () => {
    login();
    cy.get('#header button.position-relative span.d-none', { timeout: 10000 }).click();
    cy.get('#root i.bi-plus-circle', { timeout: 10000 }).click();
    cy.get('#root button.cart-checkout-btn', { timeout: 10000 }).click();
  });

  it('water soldout', () => {
    login();
    cy.get('#root img[alt="Water"]', { timeout: 10000 }).should('be.visible').click();
  });
});
