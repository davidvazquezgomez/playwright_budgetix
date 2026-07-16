Feature: Login con Google

Background:
  Given que estoy en la página de login
  Given que tengo sesión de Google guardada

@googleSaved
Scenario: Login con Google correcto
  When hace click en el link de Google
  Then debería iniciar sesión correctamente mediante Google
