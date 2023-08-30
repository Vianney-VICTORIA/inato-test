# Solution Vianney

## Todo API

- [x]  Scafold the project with NestJS
- [ ] Add docs folder and document first choice
- [x] Add trials/ endpoint + business Logic
- [ ] Add Swagger to create postman collection
- [x] Add tests

## Todo CLI

- [x] Scafold project
- [x] Nest package to call API or Commander from scratch ?


## 🕵🏾‍♀️ Asumptions

- Why Nest JS ? 
While I was free to decide what to choose for the API it was easy to go for NestJs.
It's the best NodeJS framework to build API in short period of time. The CLI and other recipe makes the process really fast.

Nest comes with a lot of feature that allow you to divide your code in modules, services, controllers, pipes, guards, interceptors, middlewares, etc.
It's a really good way to structure your code and make it more readable and maintainable.
I think for  a large project you could definitely apply a real DDD approach and the CQRS pattern.
But for the scope of this test I just used the basic structure of NestJS. DDD and CQRS would be overkill for this test and if you think further for the project itself because it's just an internal tool that it's just about wrapping an other API.
CQRS or DDD would require to spend more time defining the different root aggregates, entities, value objects, etc.
I would be more than happy to justify further this choice in a call 🤗

- Testing Strategy:
Jest is the default testing framework for NestJS. Here I am test My controller and so my DTO, Then I am testing my service and so my business logic. 

- Types Strategy:
All defined in the folder that contain the module trials
Here I have just one DTO for the request that will do the validation and transform the param country code into uppercase.
But that would be nice to have a DTO for the response as well. Here while again it's just a wrap of an existing API and tha the response might evolve I think it's better to keep it less strict.

- Error Strategy:
I haven't defined in a granular way all the errors the API could return. I think that for the sake of this test and project the current error message will be enough. And could help the Product manager to understand that the downstream API is not working properly.



