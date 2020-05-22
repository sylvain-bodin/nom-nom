describe('Recipe creation page', () => {
  it('should render the form', () => {
    // given

    // when
    cy.visit('/recipe/create');

    // then
    cy.contains('h3', 'Ajouter une recette');
    cy.contains('label', 'Nom');
    cy.get('input[placeholder="Nom de la recette"]');
    cy.contains('label', 'URL de la recette');
    cy.get('input[placeholder="URL de la recette"]');
    cy.contains('.button', 'Ajouter');
    cy.contains('.button', 'Réinitialiser');
  });

  it('should add a recipe', () => {
    // given
    cy.server();
    cy.route({
      method: 'POST',
      url: '/recipes',
      status: 201,
      response: {},
    }).as('apiRecipes');
    cy.route('GET', '/recipes', 'fixture:recipes');

    cy.visit('/recipe/create');
    cy.get('[data-test="name"] input').type('Test de recette');
    cy.get('[data-test="url"] input').type('http://recette.test');

    // when
    cy.get('[data-test="submit"]').click();


    // then
    cy.wait('@apiRecipes').should((xhr) => {
      expect(xhr.status).to.equal(201);
    });
    cy.location('pathname').should('eq', '/recipe/list');
  });

  it('should require the name', () => {
    // given
    cy.visit('/recipe/create');

    // when
    cy.get('[data-test="name"] input').focus().blur();

    // then
    cy.contains('.is-danger', 'Le champ Nom est obligatoire');
  });
  it('should require the URL', () => {
    // given
    cy.visit('/recipe/create');

    // when
    cy.get('[data-test="url"] input').focus().blur();

    // then
    cy.contains('.is-danger', 'Le champ URL de la recette est obligatoire');
  });

  it('should valid the URL', () => {
    // given
    cy.visit('/recipe/create');

    // when
    cy.get('[data-test="url"] input').type('abcdefgh');

    // then
    cy.contains('.is-danger', 'Le champ URL de la recette n\'est pas une URL valide. e.g.: https://www.exemple.com');
  });

  it('should reset the fields', () => {
    // given
    cy.visit('/recipe/create');
    cy.get('[data-test="name"] input').type('Test de recette');
    cy.get('[data-test="url"] input').type('http://recette.test');

    // when
    cy.get('[data-test="reset"]').click();

    // then
    cy.get('[data-test="name"] input').should('have.value', '');
    cy.get('[data-test="url"] input').should('have.value', '');
  });
});
