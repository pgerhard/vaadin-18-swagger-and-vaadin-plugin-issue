# vaadin-swagger-and-vaadin-plugin-issue
Project for replicating an issue caused by unintended interactions between swagger-codegen-plugin and vaadin-maven-plugin

## Issue description

Using Swagger Codegen Plugin and the Vaadin Maven Plugin in the same project results in unexpected interactions.  
The directory ```non-multi-module-example``` contains a standard Vaadin project downloaded from ```[vaddin.com/start](https://start.vaadin.com)```.  
Both projects uses a standard OpenAPI Yaml and the ```swagger-codegen-maven-plugin``` to generate code. In both situations the ```swagger-codegen-maven-plugin``` is configured to only generate model classes. During development this behaves as 
expected

* Classes are generated based on the OpenAPI YAML
* Typescript model definitions for Java classes using in @Endpoint classes are generated
* Typescript definitions for Java @Endpoint classes are generated

However during builds using the ```production``` profile, the following happens

* Classes are generated based on the OpenAPI YAML
* Typescript model definitions for Java classes using in @Endpoint classes are generated
* Typescript definitions of Java @Endpoint classes are deleted with the following message in the build log 
  * for the ```non-multi-module-example/vaadin-18-project```
```shell
[INFO] writing file /<ommitted>/non-multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/MimeTypeModel.ts
[INFO] writing file /<ommitted>/non-multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/MimeType.ts
[INFO] writing file /<ommitted>/non-multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceContainerModel.ts
[INFO] writing file /<ommitted>/non-multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceContainer.ts
[INFO] writing file /<ommitted>/non-multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceDtoModel.ts
[INFO] writing file /<ommitted>/non-multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceDto.ts
[INFO] Removing stale generated file '/<ommitted>/non-multi-module-example/vaadin-18-project/frontend/generated/ResourceEndpoint.ts'.
```
  * for the ```multi-module-example/```
```shell
[INFO] writing file /<ommitted>/multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/MimeTypeModel.ts
[INFO] writing file /<ommitted>/multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/MimeType.ts
[INFO] writing file /<ommitted>/multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceContainerModel.ts
[INFO] writing file /<ommitted>/multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceContainer.ts
[INFO] writing file /<ommitted>/multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceDtoModel.ts
[INFO] writing file /<ommitted>/multi-module-example/vaadin-18-project/frontend/generated/io/github/pgerhard/rest/v1/dto/ResourceDto.ts
[INFO] Removing stale generated file '/<ommitted>/multi-module-example/vaadin-18-project/frontend/generated/ResourceEndpoint.ts'.
```

In both cases this happens during the execution of the ```vaadin-maven-plugin``` called ```vaadin-maven-plugin:18.0.5:build-frontend (default)```.  
In order to avoid this being caused by webpacks treeshacking the endpoint is used in ```about-view.ts```.

## How to reproduce

1. Run ```mvn clean install``` inside either ```non-multi-module-example/vaadin-18-project``` or ```multi-module-example/```. After the successful build start the application. The creating of both the typescript models and services can be observed
2. Run ```mvn clean package -P production``` inside either ```non-multi-module-example/vaadin-18-project``` or ```multi-module-example/```. Observe that during the execution of the ```vaadin-maven-plugin``` the typescript service definitions are removed