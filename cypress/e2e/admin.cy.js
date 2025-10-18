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
    it('Order management', () => {
      // คลิกลิงก์ Order Management
      cy.contains('a.nav-link', 'Order Management')
      .should('be.visible')
      .click();
      // รอและเลือก dropdown แรกสุด
      cy.get('select.status-dropdown', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .first()
      .as('statusDropdown');
      // ตรวจสอบว่าค่าเริ่มต้นเป็น Pending (value = 0)
      cy.get('@statusDropdown')
      .should('have.value', '0');
      // เปลี่ยนสถานะเป็น Fulfilled (value = 1)
      cy.get('@statusDropdown')
      .select('1', { force: true });
      // รอให้ DOM อัปเดตหลังเปลี่ยนค่า
      cy.wait(500);
      // ตรวจสอบว่าค่าถูกเปลี่ยนเป็น '1'
      cy.get('@statusDropdown')
      .should('have.value', '1');
      });
  
  
    
  });
  
  
                   
});
