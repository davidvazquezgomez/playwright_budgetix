Background:
    Given que el usuario está en la página de login

  Scenario: Login con usuario y contraseña
    When introduce un nombre de usuario válido
    And introduce una contraseña válida
    And hace click en el botón "Iniciar sesión"
    Then debería acceder a la aplicación

  Scenario: Registro de nuevo usuario
    When hace click en "Regístrate aquí"
    And completa el formulario con datos válidos
    And confirma el registro
    Then debería acceder a la aplicación

  Scenario: Login con Google
    When hace click en "Continuar con Google"
    And selecciona una cuenta válida
    Then debería acceder a la aplicación

  
Scenario: Recuperar contraseña olvidada
    When hace click en "¿Olvidaste tu contraseña?"
    Then debería navegar a la página de recuperación de contraseña
    When introduce un email válido
    And hace click en "Enviar"
    Then debería ver un mensaje de confirmación de envío