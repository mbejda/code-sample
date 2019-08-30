I uploaded sample code I'm very proud of. 
I had to take it out of a larger personal project called "rlty.app" and make a few changes.

## What this code does : 
This code is part of a larger system and performs the following functions: 

It creates a service and API endpoint called "project(s)". 
**Launches a CloudFormation stack that:**
- Creates a new project bucket in S3 
- Creates a new Route53 CNAME record and gives it an S3 bucket alias.

## Why this code makes me happy:
There are 2 important bits here that I would like to highlight : 

**tests/integration** <br>
https://github.com/mbejda/code-sample/tree/master/services/projects/tests/integration


**tests/unit** <br>
https://github.com/mbejda/code-sample/tree/master/services/projects/tests/unit


As I mentioned earlier, this code is part of a larger system which is made out of many moving parts. Integration tests and unit tests ensure  progress can be made on a service level without creating a need to test the whole system. 

*Unit tests* test how well the code works while *integration tests* test how well the code integrates with other services/parts.

Both save me a lot of time debugging , testing and developing, allowing me to spend more time on other things. That is why this code makes me happy. 
