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
    Then debería acceder a la aplicación

  Examples:
    | username           | password      |
    | ENV_USER           | ENV_PASS      |

