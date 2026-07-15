Feature: Login con Google

  Scenario: Login con Google correcto
    Given que estoy en la página de login
    When hace click en el link de Google
    Then debería iniciar sesión correctamente mediante Google
