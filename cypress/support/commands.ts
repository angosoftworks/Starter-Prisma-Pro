Cypress.Commands.add('Login', (email) => {
  cy.session([email], () => {
    // Start from the index page
    cy.visit('http://localhost:3000/auth/login');

    cy.get('input').type(email);

    cy.get('button').contains(/Login/).click();

    cy.url().should('contain', '/auth/confirmed');

    cy.request({
      method: 'GET',
      url: `http://localhost:1080/email`
    }).then((res) => {
      console.log(res);
      const lastEmail = res.body.slice(-1)[0].text;
      cy.visit(lastEmail);
    });

    cy.url().should('contain', '/user/dashboard');
  });
});
