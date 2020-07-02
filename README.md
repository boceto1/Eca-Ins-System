# ECACHAIN
## Introducción
ECACHAIN es un ecosistema para el registro de actividades extracurriculares estudiantiles basado en tecnología Blockchain. Este ecosistema comprende de dos partes una Red Blockchain y un Cliente Web para su acceso a la red.

El presente repositorio corresponde al cliente web del ecosistema Blockchain.
Se desarrolla una aplicación NodeJS que renderiza un paginas web de React.

## Requerimientos

- NodeJS
- Base de Datos Mongo DB

## Installación

Una vez descargado el programa ejecuta el siguiente comando `npm install`

## Ejecutar el nodo

1. Copiar el archivo `.env.example` a `.env` y configurar las variables de entorno necesarias.

```
PORT
MONGO_URI
AUTH_KEY
CHAIN_URL
```
3. Ejecute el comando `npm start`

__Nota:__ Si esta modo de desarrollo se recomienda correr las aplicaciones por separado.
Para ejecutar el servidor rest ejecute `npm start` y para ejecutar el fronend acceda a la carpeta /frontend y ejecte `npm start`
 

## Referencia

Además la arquitectura está inspirada en el trabajo realizado para la plataforma EduCTX