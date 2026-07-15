Feature: Login de usuario
  Como usuario de Budgetix
  Quiero poder iniciar sesión con credenciales válidas
  Para acceder a la aplicación y sus funciones

  Background:
    Given que el usuario está en la página de login

  Scenario Outline: Login con usuario y contraseña
    When introduce un nombre de usuario válido "<username>"
    And introduce una contraseña válida "<password>"
    And hace click en el botón "Iniciar sesión"
    Then debería ser redirigido al dashboard
    And debería visualizar su nombre de usuario

  Examples:
    | username           | password      |
    | ENV_USER           | ENV_PASS      |

 Scenario: Login con contraseña incorrecta
    When introduce un nombre de usuario válido
    And introduce una contraseña inválida
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar un mensaje de credenciales inválidas

  Scenario: Login con credenciales inválidas
    When introduce credenciales inválidas
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar un mensaje de credenciales inválidas

  Scenario: Login con campo usuario vacío
    When introduce un nombre de usuario vacío
    And introduce una contraseña válida
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar un mensaje de Completa este campo

  Scenario: Login con campo contraseña vacío
    When introduce un nombre de usuario válido
    And introduce una contraseña vacía
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar un mensaje de Completa este campo

  Scenario: Login con campos vacíos
    When introduce un nombre de usuario vacío
    And introduce una contraseña vacía
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar mensajes de Completa este campo




 


 


