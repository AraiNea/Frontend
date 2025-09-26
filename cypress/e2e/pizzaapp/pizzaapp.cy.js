describe('Navbar navigation', () => {
  it('clicks the 3rd nav-link and searches items', () => {
    // เข้าเว็บ
    cy.visit('http://localhost:5173/')
    cy.get('body', { timeout: 10000 }).should('be.visible')

    // คลิก nav-link ตัวที่ 3 ("Search") โดยใช้ contains แทน :nth-child
    cy.contains('.nav-link', 'Search', { timeout: 10000 })
      .should('be.visible')
      .click()

    // พิมพ์ใน input search
    cy.get('.form-control', { timeout: 10000 })
      .should('be.visible')
      .and('be.enabled')
      .type('Water')

    // คลิกปุ่ม submit
    cy.get('.py-3', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true }) // ใช้ force เฉพาะกรณี element ถูก cover

    // กลับไปหน้า Home
    cy.contains('.nav-link', 'Home', { timeout: 10000 })
      .should('be.visible')
      .click()

    // คลิก nav-link Search อีกครั้ง
    cy.contains('.nav-link', 'Search', { timeout: 10000 })
      .should('be.visible')
      .click()

    // พิมพ์ใน input search อีกครั้ง
    cy.get('.form-control', { timeout: 10000 })
      .should('be.visible')
      .and('be.enabled')
      .type('BBQ')

    // คลิกปุ่ม submit อีกครั้ง
    cy.get('.py-3', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })
  })
})

