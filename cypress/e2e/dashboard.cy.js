/* 
Skenario End to End Test - Dashboard Overview:

1. Access Dashboard with Valid Session (Skenario Berhasil)

Sistem mengeset token autentikasi "valid-session-token" di dalam localStorage untuk mensimulasikan kondisi user yang sudah login.

Buka url halaman dashboard http://localhost:5173/dashboard.

Elemen nav (navigasi samping) harus terlihat di halaman utama.

Elemen header (bagian atas) harus terlihat di halaman utama.

Elemen div yang mengandung teks "Total Balance" harus terlihat jelas oleh user.

Elemen div yang mengandung teks "Goals" harus terlihat jelas oleh user.

Elemen div yang mengandung teks "Upcoming Bill" harus terlihat jelas oleh user.

Elemen div yang mengandung teks "Statistics" harus terlihat jelas oleh user.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

2. Access Dashboard with Unauthenticated Session (Skenario Gagal)

Sistem membersihkan seluruh data di localStorage (mensimulasikan kondisi user belum login atau tidak punya token).

Buka url halaman dashboard http://localhost:5173/dashboard. Sistem harus otomatis mengalihkan (redirect) user secara paksa ke halaman login http://localhost:5173/login.

Elemen input dengan id="email" harus terlihat kembali di layar sebagai bukti user berada di halaman login.
*/




describe("Dashboard Overview", () => {
  it("should allow user to access dashboard with valid session", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", "valid-session-token");
    });

    cy.visit("http://localhost:5173/dashboard");

    cy.get("nav").should("be.visible");
    cy.get("header").should("be.visible");

    cy.get("div").contains("Total Balance").should("be.visible");
    cy.get("div").contains("Goals").should("be.visible");
    cy.get("div").contains("Upcoming Bill").should("be.visible");
    cy.get("div").contains("Statistics").should("be.visible");
    
    cy.wait(5000);
  });
  

  it("should not allow unauthenticated user to access dashboard", () => {
    cy.clearLocalStorage();

    cy.visit("http://localhost:5173/dashboard");

    cy.url().should("include", "/login");

    cy.get("input#email").should("be.visible");
  });
});