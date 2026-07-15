Feature: Logout de usuario
  Como usuario de Budgetix
  Quiero poder cerrar sesión
  Para salir de la aplicación de forma segura

  Scenario: Logout correcto
    Given que el usuario ha iniciado sesión
    When hace click en cerrar sesión
    Then debería volver a la página de login
