# MyApp

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.5.

## Servidor de desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos de origen.

## Modifica la conexion hacia tu AppSync API
1. Importante: debes deplegar tu API de AppSync antes de ejecutar esta aplicación. Sigue los pasos del Readme del folder: cdk
2. Remplaza los valores de configuración de API de AppSync en el archivo: Angular/my-app/src/app/app.config.ts

## Estructura de código

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción

Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias mediante [Karma](https://karma-runner.github.io).

## Ejecución de pruebas de extremo a extremo

Ejecuta `ng e2e` para realizar las pruebas de extremo a extremo a través de una plataforma de tu elección. Para usar este comando, necesitas añadir primero un paquete que implemente capacidades de pruebas de extremo a extremo.

## Ayuda adicional

Para obtener más ayuda sobre el Angular CLI usa `ng help` o visita la página de [Visión General y Referencia de Comandos de Angular CLI](https://angular.io/cli).
