
# SemverLibs
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Links de guía e inspiración para este repo
-  [librerías con Lerna y dependencias entre ellas](https://izifortune.com/share-angular-libraries-with-lerna/).
-  [Lerna, husky, commitlint entre otros](https://medium.com/angular-in-depth/release-management-in-angular-with-lerna-21b4ab417c59).
-  [Publish Angular libraries like a Pro](https://medium.com/@hjalmers/publish-angular-libraries-like-a-pro-d6329e1b8ec)
-  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)


# Herramientas a trabajar
Antes de comenzar con las configuraciones del proyecto, vamos a contextualizar un poco acerca de las herramientas que se usuran.

## Semantic Version o SemVer

El versionamiento semántico es una especificación o estándar a la hora de definir la versión de un desarrollo, teniendo en cuenta que cada linea de código agregada impacta directamente el número de versión basandose en la naturaleza del cambio que se esta introduciendo. Para esto se definieron 3 tipos de cambios:

- Major: Cambio drástico en el software. No es compatible con código hecho en versiones anteriores.
- Minor: Cambio que añade alguna característica nueva al software o modifica alguna ya existente, pero que sigue siendo compatible con código existente. También cuando marcamos algo como obsoleto.
- Patch: Cuando arreglamos un bug siendo el cambio retrocompatible.

De esta forma, tenemos un lenguaje común entre desarrolladores e implementadores a la hora de hablar de versiones.

[Basado del sigueinte post](https://blog.armesto.net/que-es-el-versionamiento-semantico-y-por-que-es-importante/)

## Conventional Commits [Documentación](https://www.conventionalcommits.org/en/v1.0.0/)
Copiando textualmente de su documentación lerna es:

> Conventional Commits es una convención ligera sobre los mensajes de confirmación (commits). Proporciona un conjunto sencillo de reglas para crear un historial explícito de confirmaciones, lo que facilita la escritura de herramientas automatizadas sobre él. Esta convención encaja con SemVer, al describir las características (features), correcciones (fix) y cambios de ruptura (breaking changes) realizados en los mensajes de confirmación.

Con esta especificación lo que vamos a lograr es estandarizar los mensajes de los commit y al mismo tiempo brindar una lectura para las herramientas que vamos a nombrar a continuación.

## Commitizen [Repositorio de github y documentación](https://github.com/commitizen/cz-cli)
Commitizen es una CLI que nos ayuda a generar los mensajes de commit siguiendo los [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) con el fin de que puedan ser analizados para determinar la siguiente versión de la librería (la cual la realiza lerna). Este paquete se debe instalar de manera global, puesto que podemos usar git cz en lugar de git commit para confirmar los cambios que realicemos en el desarrollo de nuestras librerías.

## Lerna [Repositorio de github y documentación](https://github.com/lerna/lerna)
Copiando textualmente de su documentación lerna es:

> Una herramienta para gestionar proyectos de JavaScript con múltiples paquetes. Dividir grandes bases de código en paquetes separados con versiones independientes es extremadamente útil para compartir el código. Sin embargo, hacer cambios en muchos repositorios es complicado y difícil de seguir, y las pruebas en los repositorios se complican rápidamente. Para resolver estos (y muchos otros) problemas, algunos proyectos organizan sus bases de código en repositorios multipaquete (a veces llamados monorepos). Proyectos como Babel, React, Angular, Ember, Meteor, Jest y muchos otros desarrollan todos sus paquetes dentro de un único repositorio. Lerna es una herramienta que optimiza el flujo de trabajo en torno a la gestión de repositorios multipaquete con git y npm.

En otras palabras, lerna nos ayudara a identificar el número de **semantic version** con el cual la librería debería publicarse en cierto momento, teniendo en cuenta los commits realizados durante el desarrollo del proyecto y los cuales deben cumplir con una convención especifica. Con lerna tambien gestionaremos la manera en que publicamos la librería y como se resuelven las dependencias entre librerías.

## Conventional Changelog
Conventional Changelog es una herramienta para generar un CHANGELOG.md a partir de los metadatos de git (mensajes de los commits). Esta herramienta sólo funciona cuando seguimos las reglas de Conventional Commits.

## Husky
Husky es una herramienta de hooks (funciones que se ejecutan antes o despues de un comando) que nos permitira estar verificando los mensajes de commits que realizamos y detener los malos commits. En otras palabras lo usaremos como un lint de mensajes de commit. Añadiendo un git hook con Husky, podemos ejecutar scripts personalizados en el commit antes de dejarlo pasar.

## Commitlint
De la mano de Husky va este paquete, el cual usaremos para que después de capturar el commit, comprobemos que el mensaje agregado este usando las convenciones correctas.

# Paso para trabajar con Semantic Version en un WorkSpace de Librerías Angular

## Instalar Yarn
YARN es un gestor dependencias de JavaScript, que está enfocado en la velocidad y la seguridad, y a diferencia de otros gestores como NPM, YARN es muy rápido y muy fácil de usar. Además, YARN nos permita trabajar con dependencias entre librerías, lo cual con npm es un poco mas complicado. Debemos instalar Yarn de manera global usando el siguiente comando:
`sudo npm i -g yarn lerna commitizen`

## Eliminar package-lock.json
Debemos eliminar el package-lock.json ya que con yarn se crea el archivo yarn.lock
- borrar node_modules
- borrar package-lock.json

## Instalar paquetes con yarn
Se debe ejecutar el comando para instalar los paquetes con yarn
`yarn install`

## Inicializar un proyecto con lerna
Para inicializar un proyecto con lerna debemos ejecutar el siguiente comando
`lerna init --independent`

**Nota**: Lerna por defecto crea una carpeta llamada packages. Esta carpeta la debemos borrar ya que utilizaremos la carpeta que nos recomienda angular llamada projects para ubicar las librerías. Luego de borrar la carpeta, lo que debemos hacer es modificar el archivo lerna.json que se genero y debe quedar de la siguiente manera:

```json
{
  "packages": ["projects/*"],
  "version": "independent"
}
```

## Inicializar commitizen y la convención de mensajes que usaremos
Para inicialziar el proyecto con commitizen y ademas especificarle cual convención usaremos debemos ejecutar el siguiente comando
`commitizen init cz-conventional-changelog --yarn --dev --exact`

## Inicializar proyecto con Husky
Para inicializar un proyecto con Husky para que nos ayude a realizar las verificaciones de los commits y no dejarlo ejecutar si encuentra algún error, debemos ejecutar el siguiente comando
`npx husky-init`

**Recomendación**: Al inicializar husky se especifica que siempre antes de hacer el commit se ejecutan los test. Mientras estabilizamos las pruebas recomiendo borrarlo y luego habilitarlo cuando ya se tenga esta configuración.
- Borrar el comando de npm test del archivo .husky/pre-commit

Agregamos el hook para husky para que este verificando que los mensajes estan correctos
`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit'`

## Instalar las dependencias de desarrollo
Se deben instalar las siguientes librerías en modo desarrollo
`yarn add @commitlint/cli @commitlint/config-conventional --dev`

# Verificar archivos para su correcto funcionamiento
A continuación vamos a dar un repaso por los archivos de vital importancia para esta configuración.

## Verificar package.json
- Verificar que en la sección de script se encuentren estos 2:

	- Con este comando lo que hacemos es que al ejecutar el comando de lerna publis se realice un filtro para no publicar las librerías si no tienen cambios.
		- "prepublish": "lerna run build --since HEAD~1 --concurrency=1"

	- Este comando lo agrega la inicialización de husky, pero si no existe lo debemos agregar
		- "prepare": "husky install"

- Luego de devDependencies debemos ver estas secciones:

	- Esta sección es la que determina al commitizen cual sera la convención que usaremos y hace referencia a la cli que se crea desde este paquete aqui nombrado

		```json
		"config": {
			"commitizen": {
				"path": "./node_modules/cz-conventional-changelog"
			}
		},
		```

	- Con esta configuración determinamos cual sera el linter con el cual se van a verificar que los mensajes se hayan agregado de manera correcta
		```json
		"commitlint": {
			"extends": [
				"@commitlint/config-conventional"
			]
		},
		```

	- Con esta configuración le especificamos a husky cual es el hook de commit-msg que debe ejecutar

		```json
		"husky": {
			"hooks": {
				"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
			}
		},
		```

	- En general, a npm le falta la capacidad de vincular las bibliotecas locales mientras trabaja en un monorrepositorio. Yarn por otro lado, tiene una característica que cubre exactamente nuestras necesidades: los espacios de trabajo. Con esta configuración determinamos esto.

		```json
		"workspaces": [
			"projects/*"
		]
		```

## Verificar archivo tsconfig.json
Para cada una de las librerías que realicemos debemos hacer un cambio para que las podamos usar como dependencia dentro de otra libreria o un proyecto de ejemplo que se puede crear mas adelante. Para esto lo que hacemos es crear las siguientes rutas en la sección de compilerOptions > paths:
- "button": ["projects/button/dist"],
- "button/\*": ["projects/button/dist/\*"],

**Reemplace button por el nombre de su librería**

Más adelante vamos a configurar para que las librerías generen sus distribuciones allí.

## Verificar el archivo lerna.json
En este archivo encontramos toda la configuración de lerna y de la cual se basaran todos sus comandos. De lo mas importante acá es lo siguiente:
- Se especifica que se usa yarn
- Se especifica que podremos trabajar con dependencia entre librerías y por eso el useWorkspaces
- Se especifica que cada librería es independiente y de esa manera cada una tiene una versión diferente
```json
{
  "packages": ["projects/*"],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "independent",
  "command": {
    "publish": {
      "conventionalCommits": true,
      "ignoreChanges": ["ignored-file", "*.md"]
    },
    "version": {
      "message": "chore(release): publish"
    }
  }
}
```

# Archivos a verificar para cada librería
En esta sección se abordaran los archivos que se deben modificar para cada librería generada

## Verificar archivo package.json
Se debe agregar la sección de scripts con el siguiente contenido:
```json
...
"scripts": {
    "build": "ng build input --prod",
    "postpublish": "rm -rf dist/ && rm -rf node_modules/"
},
...
```
Estos script se realizan con la intención de:
- Cuando se ejecuta e comando `lerna publish` este pasa por cada librería y verifica si esta el comando de build para que pueda ser independiente.
- En el paso siguiente vamos a ver que le diremos a ng-packagr que el bundle de la librería lo genere en la carpeta dist dentro de la librería y no por fuera en la carpeta dist como lo hace angular por defecto.

## Verificar archivo ng-package.json
La unica configuración en este archivo, es la propiedad dest, la cual se le especifica que el bundle de la librería lo generara en una carpeta dentro del root de la librería.
```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "dist",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

# Hacer cambios
Ahora si podemos comenzar a generar cambios en nuestro repo y ejecutar el flujo para su publicacion.
- `git add .` para agregar los cambios realizados
- `git cz` para agregar el commit usando commitizen. Acá se generan una serie de preguntas que dependiendo del cambio debes responder.
- `git push` para subir a la rama en la que nos encontramos

# SemVer version bumps: MAJOR.MINOR.PATCH
Tenga en cuenta que a la hora de dejar los commits, las convenciones usan los siguientes prefijos para aumentar el numero de la versión.

- Fix/refactor = patch version bump
- Feature = minor version bump
- Breaking changes = major version bump

# Publish library changes
Con el siguiente comando se genera el login en aws y ademas se generan los build para ser publicados teniendo en cuenta los filtros del prepublish.
- **repository**: nombre de su repositorio CodeArtifact.
- **domain**: nombre de dominio CodeArtifact.
- **owner**: AWSID de cuenta de del propietario del dominio.
- **latest**: Tag con el cual se publicara la librería. Por defecto es latest, segun la documentación tenemos prerelease [en pruebas] o beta [en desarrollo].
`aws codeartifact login --tool npm --repository [repository] --domain [domain] --domain-owner [owner] --profile publish && lerna publish --contents dist --dist-tag [latest] --yes`

## Generate tag
`lerna version --conventional-commits`
