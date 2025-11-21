describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    // คลิกปุ่ม Login
    cy.get('#root button.btn-danger').click({ force: true });
    // *** เพิ่มการรอ 1.5 วินาที เพื่อให้หน้าหลักโหลดเสร็จ ***
    cy.wait(1500); 
    cy.get('#root img[alt="BaconHam Cheese"]').click({ force: true });
    cy.get('#root button.w-100').click({ force: true });
    cy.get('button.form-Button-Swal').click({ force: true });
  })

  it('dppicate cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    // คลิกปุ่ม Login
    cy.get('#root button.btn-danger').click({ force: true });
    // *** เพิ่มการรอ 1.5 วินาที เพื่อให้หน้าหลักโหลดเสร็จ ***
    cy.wait(1500); 
    cy.get('#root img[alt="BaconHam Cheese"]').click({ force: true });
    cy.get('#root button.w-100').click({ force: true });
    cy.get('button.form-Button-Swal').click({ force: true });
    
  })

  it('modify cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    // คลิกปุ่ม Login
    cy.get('#root button.btn-danger').click({ force: true });
    // *** เพิ่มการรอ 1.5 วินาที เพื่อให้หน้าหลักโหลดเสร็จ ***
    cy.wait(1500); 
    cy.get('#header button.position-relative span.d-none').click();
    cy.get('#root i.bi-plus-circle').click({ force: true });
    cy.get('#root button.cart-checkout-btn').click({ force: true });
        
  })

  it('water soldout', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click({ force: true });
    cy.get('#header button.dropdown-item').click({ force: true });
    cy.get('#root input[placeholder="Value"][type="text"]').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('alice', { force: true });
    cy.get('#root input[type="password"]').click({ force: true });
    cy.get('#root input[type="password"]').type('alice123', { force: true });
    // คลิกปุ่ม Login
    cy.get('#root button.btn-danger').click({ force: true });
    // *** เพิ่มการรอ 1.5 วินาที เพื่อให้หน้าหลักโหลดเสร็จ ***
    cy.wait(1500); 
    cy.get('#root img[alt="Water"]').click();
  })
})