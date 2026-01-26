import jsPDF from 'jspdf';

export const generateReceipt = (data, type = 'BOOKING') => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(200, 155, 60); // Gold
    doc.text("YUMRUSH", 105, 20, null, null, "center");

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("123 Culinary Avenue, Metropolis", 105, 26, null, null, "center");
    // Date of Receipt
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 31, null, null, "center");

    doc.line(20, 35, 190, 35); // Divider

    let y = 50;

    // --- BOOKING RECEIPT ---
    if (type === 'BOOKING') {
        const { booking, discountDetails = {} } = data;

        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("Table Reservation", 20, y);
        doc.setFontSize(12);
        doc.text(`ID: ${booking._id?.slice(-6).toUpperCase()}`, 150, y);
        y += 15;

        doc.setFontSize(12);
        doc.text(`Customer: ${booking.customerName}`, 20, y); y += 10;
        doc.text(`Date: ${booking.date}`, 20, y); y += 10;
        doc.text(`Time: ${booking.timeSlot}`, 20, y); y += 10;
        doc.text(`Guests: ${booking.guests}`, 20, y); y += 10;
        doc.text(`Table: ${booking.tableId ? 'Assigned' : 'Pending'}`, 20, y); y += 15;

        doc.line(20, y, 190, y); y += 10;

        // Mock Financials
        const basePrice = booking.guests * 500;
        doc.text("Estimated Cover Charge:", 20, y);
        doc.text(`Rs. ${basePrice}`, 170, y, null, null, "right");

        if (discountDetails.discount > 0) {
            y += 10;
            doc.setTextColor(0, 180, 0);
            doc.text(`Coupon (${discountDetails.code}):`, 20, y);
            doc.text(`- Rs. ${discountDetails.discount}`, 170, y, null, null, "right");
        }

        y += 15;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text("Total Payable at Restaurant:", 20, y);
        doc.text(`Rs. ${basePrice - (discountDetails.discount || 0)}`, 170, y, null, null, "right");
    }

    // --- ORDER RECEIPT (Dine-in) ---
    else if (type === 'ORDER') {
        const { order } = data;

        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("Dine-in Order", 20, y);
        doc.setFontSize(12);
        doc.text(`ID: ${order._id?.slice(-6).toUpperCase()}`, 150, y);
        y += 15;

        doc.text(`Table Number: ${order.tableNumber}`, 20, y); y += 10;
        doc.text(`Status: Pending Payment`, 20, y); y += 15;

        // Items Table Header
        doc.setFillColor(240, 240, 240);
        doc.rect(20, y - 5, 170, 10, 'F');
        doc.setFontSize(10);
        doc.text("Item", 25, y + 2);
        doc.text("Qty", 120, y + 2);
        doc.text("Price", 140, y + 2);
        doc.text("Total", 170, y + 2);
        y += 10;

        // Items List
        order.items.forEach(item => {
            doc.text(item.name.substring(0, 40), 25, y + 2);
            doc.text(String(item.quantity), 125, y + 2, null, null, "center");
            doc.text(String(item.price), 150, y + 2, null, null, "right");
            doc.text(String(item.price * item.quantity), 180, y + 2, null, null, "right");
            y += 8;
        });

        y += 5;
        doc.line(20, y, 190, y); y += 10;

        // Totals
        const total = order.totalAmount;
        const tax = Math.round(total * 0.05);
        const grandTotal = Math.round(total * 1.05);

        doc.setFontSize(11);
        doc.text("Subtotal:", 140, y); doc.text(String(total), 180, y, null, null, "right"); y += 7;
        doc.text("Tax (5%):", 140, y); doc.text(String(tax), 180, y, null, null, "right"); y += 10;

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Grand Total:", 120, y);
        doc.text(`Rs. ${grandTotal}`, 180, y, null, null, "right");
    }

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for dining at YumRush!", 105, 270, null, null, "center");
    doc.text("Please pay at the counter to confirm.", 105, 275, null, null, "center");

    const fileName = type === 'BOOKING'
        ? `Booking_${data.booking._id?.slice(-4)}.pdf`
        : `Order_${data.order?.tableNumber}.pdf`;

    doc.save(fileName);
};
