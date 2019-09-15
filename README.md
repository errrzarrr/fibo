# fibo
A fibonacci calculator mounted over many decentralized services ---all interconnected and orchestrated with docker & docker-compose


## .travis.yml

Troubleshooting your travis deployment. Use in case of having issues.

* if travis fails with `“rakefile not found"`, at the very top of your travis file  add the following: `languague: generic`

* if `npm test` not 'returning' from _watch mode_ after finishing up testing, add `-- --coverage` at the end of your `script` testing routine. 
 
   Like this: `docker run -e CI=true errrzarrr/fibo-test npm test -- --coverage`

## Configuring AWS to deploy a Multicontainer Docker environment

Such configuration is set-up in `Dockerrun.aws.json` file. Official documentation states the following:

> A `Dockerrun.aws.json` file is an Elastic Beanstalk–specific JSON file that describes how to deploy a set of Docker containers as an Elastic Beanstalk application. You can use a `Dockerrun.aws.json` file for a multicontainer Docker environment.
> 
> `Dockerrun.aws.json` describes the containers to deploy to each container instance (Amazon EC2 instance that hosts Docker containers) in the environment as well as the data volumes to create on the host instance for the containers to mount. 


**containerDefinitions:** An array of our containers, here each one represented as an object.

**name:** Name that identifies the container on the dashboard. It doesn't need to be named same as in Dockerfile, folder or anything else. 

**image:** Basis image name to pull from Docker Hub. Format is `docker_hub_user/image_name`.

**essential:**  `"essential":false` means whether this container were to fail do not stop remaining containers. At least one container is required to be set `"essential":true`, which means whether this container were to fail, stop the remaining containers too. Our "router" container is `nginx`, therefore our `essential` container.

**hostname:** By which name current container can be accesed to by other containers or web requests. A `hostname` for `worker` and `nginx` containers can be given, but aren't required. Isn't required for `worker` because it won't be accessed by our routing service (`nginx`) or any other service in this system. Unlike _docker-compose,_ which sets up a hostname for us, here we have to set-up the name explicitly. 

**links:** An array of other containers `name`s this container can access to, representing an unidirectional relationship. This property is meant to be in the "router" or "central" container, `nginx` in this case.