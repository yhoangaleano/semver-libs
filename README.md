
# SemverLibs
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12.

## Links de guía e inspiración para este repo
-  [librerías con Lerna y dependencias entre ellas](https://izifortune.com/share-angular-libraries-with-lerna/).
-  [Lerna, husky, commitlint entre otros](https://medium.com/angular-in-depth/release-management-in-angular-with-lerna-21b4ab417c59).
-  [Publish Angular libraries like a Pro](https://medium.com/@hjalmers/publish-angular-libraries-like-a-pro-d6329e1b8ec)
-  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

# Paso para trabajar con Semantic Version en un WorkSpace de Librerías Angular

## Instalar Yarn
Debemos instalar Yarn para manejar los paquetes y que mas adelante nos permita trabajar con dependencias entre librerías.
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
