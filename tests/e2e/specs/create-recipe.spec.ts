describe('Recipe creation page', () => {
  it('should render the form', () => {
    // given

    // when
    cy.visit('/recipe/create');

    // then
    cy.contains('h3', 'Ajouter une recette').should('exist');
    cy.contains('label', 'Nom').should('exist');
    cy.get('input[placeholder="Nom de la recette"]').should('exist');
    cy.contains('label', 'URL de la recette').should('exist');
    cy.get('input[placeholder="URL de la recette"]').should('exist');
    cy.contains('label', 'Image').should('exist');
    cy.contains('Envoyer une image').should('exist');
    cy.contains('label', 'Etiquettes').should('exist');
    cy.get('input[placeholder="Ajouter une étiquette"]').should('exist');
    cy.contains('.button', 'Ajouter').should('exist');
    cy.contains('.button', 'Réinitialiser').should('exist');
  });

  it('should add a recipe with only required fields', () => {
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
      expect(xhr.requestBody).to.deep.equal({
        name: 'Test de recette',
        url: 'http://recette.test',
      });
    });
    cy.location('pathname').should('eq', '/recipe/list');
  });

  it('should add a recipe with all fields', async () => {
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

    let content = '';
    cy.fixture('images/food.jpg').then((fileContent) => {
      content = fileContent;
      cy.get('[data-test="upload"]').upload({
        fileContent,
        fileName: 'food.jpg',
        mimeType: 'image/jpeg',
      });
    });


    cy.get('[data-test="tags"]').type('Végétarien');

    // when
    cy.get('[data-test="submit"]').click();


    // then

    cy.wait('@apiRecipes').should((xhr) => {
      expect(xhr.status).to.equal(201);
      expect(xhr.requestBody).to.deep.equal({
        name: 'Test de recette',
        url: 'http://recette.test',
        image: `data:image/jpeg;base64,${content}`,
        tags: ['Végétarien'],
      });
    });
    cy.location('pathname').should('eq', '/recipe/list');
  });

  it('should require the name', () => {
    // given
    cy.visit('/recipe/create');

    // when
    cy.get('[data-test="name"] input').focus().blur();

    // then
    cy.get('.is-danger').should('contain.text', 'Le champ Nom est obligatoire');
  });

  it('should require the URL', () => {
    // given
    cy.visit('/recipe/create');

    // when
    cy.get('[data-test="url"] input').focus().blur();

    // then
    cy.get('.is-danger').should('contain.text', 'Le champ URL de la recette est obligatoire');
  });

  it('should valid the URL', () => {
    // given
    cy.visit('/recipe/create');

    // when
    cy.get('[data-test="url"] input').type('abcdefgh');

    // then
    cy.get('.is-danger').should('contain.text', 'Le champ URL de la recette n\'est pas une URL valide. e.g.: https://www.exemple.com');
  });

  it('should not accept pdf file in upload', () => {
    // given
    cy.visit('/recipe/create');

    // when
    cy.fixture('images/food.pdf').as('fileContent').then((fileContent) => {
      cy.get('[data-test="upload"]').upload({
        fileContent,
        fileName: 'food.pdf',
        mimeType: 'application/pdf',
      });
    });

    // then
    cy.get('.is-danger').should('contain.text', 'Le champ Image doit être une image');
  });

  it('should reset the fields', () => {
    // given
    cy.visit('/recipe/create');
    cy.get('[data-test="name"] input').type('Test de recette');
    cy.get('[data-test="url"] input').type('http://recette.test');
    cy.fixture('images/food.jpg').then((fileContent) => {
      cy.get('[data-test="upload"]').upload({ fileContent, fileName: 'food.jpg', mimeType: 'image/jpeg' });
    });
    cy.get('[data-test="tags"]').type('Végétarien');

    // when
    cy.get('[data-test="reset"]').click();

    // then
    cy.get('[data-test="name"] input').should('have.value', '');
    cy.get('[data-test="url"] input').should('have.value', '');
    cy.get('[data-test="upload"]').should('have.value', '');
    cy.get('[data-test="tags"]').should('have.value', '');
  });
});
