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

  Scenario: Login con usuario inexistente
    When introduce un nombre de usuario inválido
    And introduce una contraseña válida
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar un mensaje de credenciales inválidas

  Scenario: Login con contraseña incorrecta
    When introduce un nombre de usuario válido
    And introduce una contraseña inválida
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar un mensaje de credenciales inválidas

  Scenario: Login con credenciales inválidas
    When introduce credenciales inválidas
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar un mensaje de credenciales inválidas
      
  Scenario: Usuario vacío
    When introduce una contraseña válida
    And hace click en el botón "Iniciar sesión"
    Then debería visualizar que el usuario es obligatorio

Scenario: Contraseña vacía
  When introduce un usuario válido
  And hace click en el botón "Iniciar sesión"
  Then debería visualizar que la contraseña es obligatoria

Scenario: Campos vacíos
  When hace click en el botón "Iniciar sesión"
  Then debería visualizar los errores de validación

Scenario: Login exitoso
  When inicia sesión con credenciales válidas
  Then debería visualizar el dashboard

Scenario: Logout correcto
  Given que el usuario ha iniciado sesión
  When hace click en cerrar sesión
  Then debería volver a la página de login

Scenario: Usuario con sesión activa
  Given que el usuario ya tiene sesión iniciada
  When accede a la aplicación
  Then debería acceder directamente al dashboard

Scenario: Usuario no autenticado
  When accede directamente al dashboard
  Then debería ser redirigido al login


