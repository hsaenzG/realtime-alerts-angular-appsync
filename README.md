# Ejemplo de Integración AppSync con Angular

Este repositorio contiene un ejemplo práctico de cómo utilizar AWS AppSync para implementar una API de publicación/suscripción (Pub/Sub) y conectarla con un frontend desarrollado en Angular. Este ejemplo está diseñado para proporcionar una base sobre cómo integrar tecnologías serverless con aplicaciones de frontend modernas.

## Descripción General

AWS AppSync es un servicio gestionado que facilita el desarrollo de aplicaciones móviles y web al manejar de forma segura y escalable las operaciones de datos para aplicaciones. Este ejemplo específico demuestra cómo configurar AppSync como una API de Pub/Sub para transmitir datos en tiempo real a un cliente Angular.

### Beneficios de utilizar AWS AppSync

- **Gestión Simplificada**: AWS AppSync elimina la necesidad de gestionar la infraestructura subyacente para aplicaciones en tiempo real y permite a los desarrolladores concentrarse en la lógica del negocio.
- **Escala Automática**: Con AppSync, la API escala automáticamente según las necesidades del tráfico, lo que asegura que la aplicación pueda manejar incrementos súbitos de usuarios y datos sin intervención manual.
- **Seguridad Integrada**: AppSync proporciona características robustas de seguridad que incluyen control de acceso basado en roles y autenticación fácil de integrar con Amazon Cognito.
- **Desarrollo Ágil**: AppSync soporta un desarrollo frontend y backend más rápido y eficiente gracias a su integración con GraphQL, que permite a los desarrolladores obtener múltiples fuentes de datos en una sola petición de API.

## Requisitos Previos

- Cuenta de AWS con acceso configurado.
- [AWS CLI](https://aws.amazon.com/cli/) instalado y configurado.
- [Node.js](https://nodejs.org/) y [NPM](https://www.npmjs.com/) instalados.
- [Angular CLI](https://angular.io/cli) instalado.

## Configuración del Proyecto

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/hsaenzG/realtime-alerts-angular-appsync.git
   cd AppSyncLambda
   ```
2. **Instalar Dependencias** 

- BackEnd: Sigue las instrucciones del archivo readme.md de la ruta cdk
- FrontEnd: Sigue las instrucciones del archivo readme.md de la ruta Angular

### Uso
** Publicar Mensajes: La aplicación incluye un formulario para enviar mensajes, que se publican a través de AppSync y se transmiten a todos los suscriptores en tiempo real.
** Suscribirse a Mensajes: Los usuarios conectados recibirán actualizaciones en tiempo real cuando se publiquen nuevos mensajes.

### Limpieza
Para evitar incurrir en gastos adicionales, asegúrate de eliminar los recursos de AWS que no se estén utilizando una vez que termines de experimentar con la aplicación.