# this file can be edited multiple times for the notes and updates

### Notes: 
* Currently writing the code base from the perspective of scalability
* example endpoint, if you want to test it - its deployed in AWS

#### Check this sample requests, params can be modified

http://travel-to-heaven.eu-central-1.elasticbeanstalk.com/v1/recruiting/hotels

http://travel-to-heaven.eu-central-1.elasticbeanstalk.com/v1/recruiting/hotels/2202

http://travel-to-heaven.eu-central-1.elasticbeanstalk.com/v1/recruiting/hotels/2202?lang=de-DE

http://travel-to-heaven.eu-central-1.elasticbeanstalk.com/v1/recruiting/hotels?lang=de-DE&search=hotel

http://travel-to-heaven.eu-central-1.elasticbeanstalk.com/v1/recruiting/hotels?search=hotel
### Changelog

1.0 - Initialise the basic boiler plate code
2.0 - Create structure for the code 
3.0 - Backend task completed with development part
4.0 - Logger Added
5.0 - Sample test cases added
### What more can be added in future?
* can add connection with mongodb via mongoose
    * Boiler plate code/ structure is added   
* test cases - sample test cases added, obviously we can add unit test, integration test (with stubs/mocks etc)
* swagger docs
* jsodcs
* eslinter can be configured in better way

