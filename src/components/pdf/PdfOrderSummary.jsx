import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PdfOrderSummary = ({ data }) => {
    const { order, orderItems } = data;

    const formatMoney = (value) => {
        const num = Number(value ?? 0);
        // ตัวเลขล้วน ๆ ไม่มีสัญลักษณ์สกุลเงิน
        return num.toFixed(2); // เช่น 349.00
    };

    const handleGenerate = () => {
        const doc = new jsPDF("p", "mm", "a4");

        // ========= Header หลัก =========
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Order Summary", 105, 15, { align: "center" });

        doc.setFontSize(11);

        // ข้อมูล Order (ใช้เท่าที่มี)
        doc.setFont("helvetica", "bold");
        doc.text("Order ID:", 20, 30);
        doc.setFont("helvetica", "normal");
        doc.text(String(order.orderId), 50, 30);

        doc.setFont("helvetica", "bold");
        doc.text("Customer:", 20, 38);
        doc.setFont("helvetica", "normal");
        doc.text(order.username ?? "-", 50, 38);

        doc.setFont("helvetica", "bold");
        doc.text("Ordered at:", 20, 46);
        doc.setFont("helvetica", "normal");
        doc.text(String(order.createdAt ?? "-"), 50, 46);

        // ========= ตารางสินค้า =========
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Order Items", 20, 60);

        const body = orderItems.map((item, index) => [
            index + 1,
            item.productName,
            formatMoney(item.productPrice),
            item.qty,
            formatMoney(item.lineTotal),
        ]);

        autoTable(doc, {
            startY: 64,
            head: [["No.", "Product", "Price", "Qty", "Total"]],
            body,
            styles: { font: "helvetica", fontSize: 10 },
            headStyles: {
                fillColor: [240, 240, 240], // พื้นหลังเทาอ่อนเหมือนเดิม
                textColor: [0, 0, 0],       // ✅ สีตัวอักษร = ดำ
                fontStyle: "bold",          // (เลือกได้) ให้ header เป็นตัวหนา
            },
            columnStyles: {
                2: { halign: "right" },
                3: { halign: "right" },
                4: { halign: "right" },
            },
            theme: "grid",
        });

        const finalY = doc.lastAutoTable?.finalY ?? 64;

        // ========= สรุปราคา =========
        const totalsStartY = finalY + 10;

        doc.setFontSize(11);

        doc.setFont("helvetica", "bold");
        doc.text("Subtotal:", 130, totalsStartY);
        doc.setFont("helvetica", "normal");
        doc.text(formatMoney(order.subtotal), 190, totalsStartY, {
            align: "right",
        });

        doc.setFont("helvetica", "bold");
        doc.text("Delivery fee:", 130, totalsStartY + 7);
        doc.setFont("helvetica", "normal");
        doc.text(formatMoney(order.deliveryFee), 190, totalsStartY + 7, {
            align: "right",
        });

        doc.setFont("helvetica", "bold");
        doc.text("Grand total:", 130, totalsStartY + 14);
        doc.setFont("helvetica", "bold");
        doc.text(formatMoney(order.grandTotal), 190, totalsStartY + 14, {
            align: "right",
        });

        // ========= แสดง PDF ในแท็บใหม่ =========
        doc.setProperties({ title: `Order_${order.orderId}.pdf` });

        // แปลงเป็น Blob
        const pdfBlob = doc.output("blob");

        // เปิดหน้าต่าง/แท็บใหม่
        const newWindow = window.open("", "_blank");

        if (newWindow) {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            newWindow.location.href = pdfUrl;
            newWindow.focus();
        } else {
            // ถ้า browser บล็อก popup ให้ fallback เป็นดาวน์โหลดไฟล์แทน
            const link = document.createElement("a");
            link.href = URL.createObjectURL(pdfBlob);
            link.download = `Order_${order.orderId}.pdf`;
            link.click();
        }
    };

    return (
        <button
            type="button"
            className="btn btn-sm btn-danger rounded-3"
            title="Download PDF"
            onClick={handleGenerate}
        >
            <i className="bi bi-file-earmark-pdf" />
        </button>
    );
};

export default PdfOrderSummary;
