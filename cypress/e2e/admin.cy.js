describe('template spec', () => {
  // ก่อนทุก it ให้ login และตั้ง viewport
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(1280, 800);

    // Login
    cy.contains('span', 'Guest').click();
    cy.contains('button.dropdown-item', 'Log In').click({ force: true });
    cy.contains('label', 'Username').next('input.form-control').type('carol');
    cy.contains('label', 'Password').next('input[type="password"]').type('carol123');
    cy.contains('button.btn.btn-danger', 'Sign In').click();
  });

  it('should visit homepage', () => {
    cy.visit('http://localhost:3000/productsManagement');
    // ตรวจสอบว่า login สำเร็จ
    cy.contains('span', 'carol').should('be.visible');
  });

  it('search product name', () => {
    cy.get('input.product-search-box')
      .should('be.visible')
      .type('Garlic Bread{enter}');

    // คลิก slider เพื่อ toggle
    cy.get('span.slider')
      .should('be.visible')
      .click();

    // ตรวจสอบ state ของ input ที่ slider ควบคุม
    

      cy.get('button.swal2-confirm')
      .should('be.visible')
      .and('have.text', 'Close Window')
      .click();
  });

  it('modify product', () => {
    // สมมติ icon อยู่ใน button
    cy.get('button.btn-edit')  // เจอหลายปุ่ม
    .first()                 // เลือกปุ่มตัวแรก
    .should('be.visible')
   .click();
   cy.get('button.btn-save')   // เลือกปุ่ม Save
   .should('be.visible')     // ตรวจสอบว่าปุ่มแสดง
   .click();                 // คลิกปุ่ม
   cy.get('button.form-Button-Swal-Delete')
  .first()                   // เลือกปุ่มตัวแรก
  .should('be.visible')
  .and('contain.text', 'Confirm')  // ใช้ contain.text แทน have.text
  .click();
                            // คลิกปุ่ม

    



  });

  it('Category management', () => {
    // สมมติ icon อยู่ใน button
    cy.get('a[href="/categoryManagement"]')
  .should('be.visible')
  .click();
  cy.get('button.product-btn-add')   // เลือกปุ่ม Add Category
  .should('be.visible')            // ตรวจสอบว่าปรากฏ
  .and('contain.text', 'Add Category') // ตรวจสอบข้อความ
  .click();                        // คลิกปุ่ม
  cy.get('i.upload-icon')      // เลือก icon
  .should('be.visible');     // ตรวจสอบว่ามองเห็น
  })

  it('Order management', () => {
    // คลิกลิงก์ Order Management
    cy.contains('a.nav-link', 'Order Management')
      .should('be.visible')
      .click();
  
    // รอให้ dropdown ปรากฏ
    cy.get('select.status-dropdown.status-fulfilled')
      .should('be.visible')
      .should('not.be.disabled')
      .as('statusDropdown'); // ตั้ง alias
  
    // เลือก Fulfilled
    cy.get('@statusDropdown')
      .select('1')
      .should('have.value', '1'); // ตรวจสอบว่าเลือกสำเร็จ
  
    // เลือก Pending
    cy.get('@statusDropdown')
      .select('0');
    cy.get('button.swal2-confirm.btn.form-Button-Swal-Delete')
      .should('be.visible')    // ตรวจสอบว่าปุ่มเห็นได้
      .click();  // ตรวจสอบว่าเลือกสำเร็จ
  });
  
  
                   
});
