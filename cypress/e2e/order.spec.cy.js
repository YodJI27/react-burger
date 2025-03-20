
describe('создание заказа', function () {
  before(function () {
      cy.visit('/');
      cy.intercept('GET', 'ingredients', {
          fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.intercept('POST', '*/auth/login', {
          fixture: 'login.json'
      }).as('login');
      cy.intercept('POST', '*/orders', {
          fixture: 'orders.json'
      });

      cy.wait(['@getIngredients']);
  });

  it('перетаскивание ингредиента', function () {
      cy.get('[class^=_cardBurger_]').first().as('ingredient');
      cy.get('[class^=_burgerContainerDrop_]').first().as('constructor');


      cy.get('@ingredient').trigger('dragstart');
      cy.get('@constructor')
          .trigger('dragenter')
          .trigger('dragover')
          .trigger('drop')
          .trigger('dragend');

      cy.get('button').contains('Оформить заказ').click();
      cy.url().should('contain', 'login');
      cy.get('input[type=email]').type('yodji62@yandex.ru');
      cy.get('input[type=password]').type('admin62');
      cy.get('button').contains('Войти').click();
      cy.get('button').contains('Оформить заказ').click();
      cy.get('[class^=_modalContainer_]').first().should('contain', 71222);
  });
}); 