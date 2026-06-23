Feature: Acceder a la app

  Scenario: Acceder a la app desde el menú hamburguesa
    Given que el usuario está en la home
    When hace click en el menú hamburguesa
    Then debería ver el botón "Acceder a la app"
    When hace click en "Acceder a la app"
    Then debería navegar a la página de login

  


