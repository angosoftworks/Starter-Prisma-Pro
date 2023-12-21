describe('home page tests', () => {
  before(() => {
    cy.fixture('users').then((data) => {
      this.data = data;
    });
  });

  beforeEach(() => {
    cy.Login(this.data.PRIMARY_USER.email);
    cy.visit('http://localhost:3000/user/dashboard');
  });

  it('should test something on the /home page', () => {
    cy.url().should('contain', '/user/dashboard');
    console.log(this.data);
  });

  it('should test something else on the /home page', () => {
    // assertions
  });
});

//describe('other page tests', () => {
//  beforeEach(() => {
//    cy.Login('testuser234@yahoo.com');
//    cy.visit('/other');
//  });

//  it('should test something on the /other page', () => {
//    // assertions
//  });
//});
