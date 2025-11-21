describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

  })

  it('register', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root button.btn-warning').click();
    cy.contains('label', 'Username').next('input.form-control').type('nompongggg');
    cy.contains('label', 'Password').next('input[type="password"]').type('nmpong1234567');
    cy.get('input[name="username"]').type('myUsernamee');
    cy.get('input[name="password"]').type('myPasswordd');
    cy.get('input[name="profileName"]')
    .should('be.visible')
    .type('Daraporn');
    cy.get('input[name="profileSname"]')
    .should('be.visible')
    .type('Saepoo');
    // กรอก Address/Contact ข้อมูล
    cy.get('input[name="phone"]').first().type('0934399215');
    cy.get('input[name="province"]').first().type('Bangkok');
    cy.get('input[name="amphor"]').first().type('Bang Kapi');
    cy.get('input[name="district"]').first().type('Hua Mak');
    cy.get('input[name="zipCode"]').first().type('10240');
    cy.get('input[name="addrNum"]').first().type('123/45');
    cy.get('input[name="detail"]').first().type('Apartment 2B');
    cy.get('input[name="receivedName"]').first().type('Daraporn Saepoo');
    cy.get('#root button.register-button').click();

          
    
  })

  it('dupicate register', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root button.btn-warning').click();
    cy.contains('label', 'Username').next('input.form-control').type('nompongggg');
    cy.contains('label', 'Password').next('input[type="password"]').type('nmpong1234567');
    cy.get('input[name="username"]').type('myUsernamee');
    cy.get('input[name="password"]').type('myPasswordd');
    cy.get('input[name="profileName"]')
    .should('be.visible')
    .type('Daraporn');
    cy.get('input[name="profileSname"]')
    .should('be.visible')
    .type('Saepoo');
    // กรอก Address/Contact ข้อมูล
    cy.get('input[name="phone"]').first().type('0934399215');
    cy.get('input[name="province"]').first().type('Bangkok');
    cy.get('input[name="amphor"]').first().type('Bang Kapi');
    cy.get('input[name="district"]').first().type('Hua Mak');
    cy.get('input[name="zipCode"]').first().type('10240');
    cy.get('input[name="addrNum"]').first().type('123/45');
    cy.get('input[name="detail"]').first().type('Apartment 2B');
    cy.get('input[name="receivedName"]').first().type('Daraporn Saepoo');
    cy.get('#root button.register-button').click();

          
    
  })

  it('registertel11', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root button.btn-warning').click();
    cy.contains('label', 'Username').next('input.form-control').type('nompong');
    cy.contains('label', 'Password').next('input[type="password"]').type('nmpong1234');
    cy.get('input[name="username"]').type('myUsername');
    cy.get('input[name="password"]').type('myPassword');
    cy.get('input[name="profileName"]')
    .should('be.visible')
    .type('Daraporn');
    cy.get('input[name="profileSname"]')
    .should('be.visible')
    .type('Saepoo');
    // กรอก Address/Contact ข้อมูล
    cy.get('input[name="phone"]').first().type('08123456783');
    cy.get('input[name="province"]').first().type('Bangkok');
    cy.get('input[name="amphor"]').first().type('Bang Kapi');
    cy.get('input[name="district"]').first().type('Hua Mak');
    cy.get('input[name="zipCode"]').first().type('10240');
    cy.get('input[name="addrNum"]').first().type('123/45');
    cy.get('input[name="detail"]').first().type('Apartment 2B');
    cy.get('input[name="receivedName"]').first().type('Daraporn Saepoo');
    cy.get('#root button.register-button').click();

          
    
  })
  it('registertel9', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root button.btn-warning').click();
    cy.contains('label', 'Username').next('input.form-control').type('nompong');
    cy.contains('label', 'Password').next('input[type="password"]').type('nmpong1234');
    cy.get('input[name="username"]').type('myUsername');
    cy.get('input[name="password"]').type('myPassword');
    cy.get('input[name="profileName"]')
    .should('be.visible')
    .type('Daraporn');
    cy.get('input[name="profileSname"]')
    .should('be.visible')
    .type('Saepoo');
    // กรอก Address/Contact ข้อมูล
    cy.get('input[name="phone"]').first().type('081234567');
    cy.get('input[name="province"]').first().type('Bangkok');
    cy.get('input[name="amphor"]').first().type('Bang Kapi');
    cy.get('input[name="district"]').first().type('Hua Mak');
    cy.get('input[name="zipCode"]').first().type('10240');
    cy.get('input[name="addrNum"]').first().type('123/45');
    cy.get('input[name="detail"]').first().type('Apartment 2B');
    cy.get('input[name="receivedName"]').first().type('Daraporn Saepoo');
    cy.get('#root button.register-button').click();

          
    
  })

  it('registerzipcode6', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root button.btn-warning').click();
    cy.contains('label', 'Username').next('input.form-control').type('nompong');
    cy.contains('label', 'Password').next('input[type="password"]').type('nmpong1234');
    cy.get('input[name="username"]').type('myUsername');
    cy.get('input[name="password"]').type('myPassword');
    cy.get('input[name="profileName"]')
    .should('be.visible')
    .type('Daraporn');
    cy.get('input[name="profileSname"]')
    .should('be.visible')
    .type('Saepoo');
    // กรอก Address/Contact ข้อมูล
    cy.get('input[name="phone"]').first().type('08123456783');
    cy.get('input[name="province"]').first().type('Bangkok');
    cy.get('input[name="amphor"]').first().type('Bang Kapi');
    cy.get('input[name="district"]').first().type('Hua Mak');
    cy.get('input[name="zipCode"]').first().type('102405');
    cy.get('input[name="addrNum"]').first().type('123/45');
    cy.get('input[name="detail"]').first().type('Apartment 2B');
    cy.get('input[name="receivedName"]').first().type('Daraporn Saepoo');
    cy.get('#root button.register-button').click();

          
    
  })

  it('registerzipcode4', () => {
    cy.visit('http://localhost:3000')
    cy.get('#header span.d-none').click();
    cy.get('#header button.dropdown-item').click();
    cy.get('#root button.btn-warning').click();
    cy.contains('label', 'Username').next('input.form-control').type('nompong');
    cy.contains('label', 'Password').next('input[type="password"]').type('nmpong1234');
    cy.get('input[name="username"]').type('myUsername');
    cy.get('input[name="password"]').type('myPassword');
    cy.get('input[name="profileName"]')
    .should('be.visible')
    .type('Daraporn');
    cy.get('input[name="profileSname"]')
    .should('be.visible')
    .type('Saepoo');
    // กรอก Address/Contact ข้อมูล
    cy.get('input[name="phone"]').first().type('08123456783');
    cy.get('input[name="province"]').first().type('Bangkok');
    cy.get('input[name="amphor"]').first().type('Bang Kapi');
    cy.get('input[name="district"]').first().type('Hua Mak');
    cy.get('input[name="zipCode"]').first().type('10205');
    cy.get('input[name="addrNum"]').first().type('123/45');
    cy.get('input[name="detail"]').first().type('Apartment 2B');
    cy.get('input[name="receivedName"]').first().type('Daraporn Saepoo');
    cy.get('#root button.register-button').click();

          
    
  })

  
})