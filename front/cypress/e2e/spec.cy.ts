describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Gérer efficacement votre stock');
    cy.get('button').click();
    cy.wait(2000);
    cy.get('table tbody tr').contains('Pelle').click();
    cy.get('button[title="Supprimer"]');
  });
});
