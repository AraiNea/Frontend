describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  // it('go to regis', () => {
  //   cy.visit('http://localhost:3000')
  //   cy.get('.header-action-btn').click({force:true})
  //   cy.get('.dropdown-item').click({force:true})
  //   cy.get('.btn-warning').click({force:true})
  // })
  it('Assign', () => {
    cy.visit('http://localhost:3000/register')
   // ✅ รอให้ form โหลดก่อน (ช่วยกันโหลดช้า)
   cy.get('form.register-form', { timeout: 10000 }).should('be.visible')

   // ✅ กรอกฟอร์ม
   cy.get('[name="username"]').type('aikeaw', { force: true })
   cy.get('[name="password"]').type('12345', { force: true })
   cy.get('[name="profileName"]').type('Daraporn', { force: true })
   cy.get('[name="profileSname"]').type('Saepoo', { force: true })
   cy.get('[name="phone"]').type('0812345678', { force: true })
   cy.get('[name="province"]').type('Chiang Mai', { force: true })
   cy.get('[name="amphor"]').type('Mueang', { force: true })
   cy.get('[name="district"]').type('Suthep', { force: true })
   cy.get('[name="zipCode"]').type('50000', { force: true })
   cy.get('[name="addrNum"]').type('123/4', { force: true })
   cy.get('[name="detail"]').type('Next to university', { force: true })
   cy.get('[name="receivedName"]').type('Daraporn Saepoo', { force: true })

   // ✅ ส่งฟอร์ม
   cy.get('.register-form > .btn').click({ force: true })

   


    
  })
})