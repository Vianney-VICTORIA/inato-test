# Solution Vianney

## Todo API

- [x]  Scafold the project with NestJS
- [ ] Add docs folder and document first choice
- [x] Add trials/ endpoint + business Logic
- [ ] Add Swagger to create postman collection
- [x] Add tests

## Todo CLI

- [ ] Scafold project
- [ ] Nest package to call API or Commander from scratch ?


## 🕵🏾‍♀️ Asumptions

- Why Nest JS ? 
While I was free to decide what to choose for the API it was easy to go for NestJs.
It's the best NodeJS framework to build API in short period of time. The CLI and other recipe makes the process really fast.

Nest comes with a lot of feature that allow you to divide your code in modules, services, controllers, pipes, guards, interceptors, middlewares, etc.
It's a really good way to structure your code and make it more readable and maintainable.
I think for  a large project you could definitely aply to thing : a real DDD approach and the CQRS pattern.
Here I just used the basic structure of NestJS. DDD and CQRS would be overkill for this project. and would require to spend more time defining the different root aggregates, entities, value objects, etc.
I would be more than happy to justify this choice in a call 🤗

Testing Strategy:
- Jest is the default testing framework for NestJS. Here I am test My controller and so my DTO, Then I am testing my service and so my business logic. 
