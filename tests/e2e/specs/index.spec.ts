describe('Show the index page', () => {
  it('should visits the app root url', () => {
    // given
    cy.server();
    cy.route('/recipes', 'fixture:recipes').as('getRecipes');

    // when
    cy.visit('/');
    cy.wait('@getRecipes');

    // then
    cy.contains('h1', 'NomNom');
    cy.contains('h2', 'Qu\'allez-vous manger ce soir ?');
    cy.contains('[data-test=add-recipe]', 'Ajouter une recette');
    cy.get('[data-test=recipe-list]').children().should('have.length', 3);
  });

  it('should go to the recipe creation page', () => {
    // given
    cy.visit('/');

    // when
    cy.get('[data-test=add-recipe]').click();

    // then
    cy.location('pathname').should('eq', '/recipe/create');
  });

  it('should go to the recipe page', () => {
    // given
    cy.server();
    cy.route('/recipes', 'fixture:recipes').as('getRecipes');
    cy.visit('/');
    cy.wait('@getRecipes');

    // when
    cy.get('[data-test=recipe-list]').children().first().children('a')
      .click();

    // then
    cy.location('pathname').should('eq', '/recipe/1');
  });
});
