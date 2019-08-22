# fibo
A fibonacci calculator mounted over many decentralized services ---all interconnected and orchestrated with docker & docker-compose


## .travis.yml

Troubleshooting your travis deployment. Use in case of having issues.

* if travis fails with `“rakefile not found"`, at the very top of your travis file  add the following: `languague: generic`

* if `npm test` not 'returning' from _watch mode_ after finishing up testing, add `-- --coverage` at the end of your `script` testing routine. 
 
   Like this: `docker run -e CI=true errrzarrr/fibo-test npm test -- --coverage`