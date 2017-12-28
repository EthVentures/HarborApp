
[![EthVentures](https://github.com/EthVentures/HarborApp/raw/master/src/assets/safeharborlogo.png)](https://projectsafeharbor.com)

[Project Safe Harbor](https://projectsafeharbor.com), is is an open source platform that leverages blockchain and artificial intelligence to enable societies and communities to provide basic resources, safety, and security to the more than 65 million asylum seekers around the world. This project launched in December 2017 as a submission to the [World Virtual Govhack](http://hackathon.govtechprize.ae/) hackathon. We focus on the top challenges asylum seekers face - **establishing identity, accessing educational and job training opportunities, securing medical care, and reuniting with family members.**

Home Screen | Refugee View | Service Provider View
--- | --- | ---
<img src="https://github.com/EthVentures/HarborApp/raw/master/src/assets/ss1.png" alt="safe harbor home screen" style="width: 250px;"/>| <img src="https://github.com/EthVentures/HarborApp/raw/master/src/assets/ss2.png" alt="refugee view" style="width: 250px;"/>| <img src="https://github.com/EthVentures/HarborApp/raw/master/src/assets/ss3.png" alt="service provider view" style="width: 250px;"/>

## Identity Management
The first step to using our app is the establishment of self-sovereign identification powered by [uPort](https://uport.me/) - which allows interaction with the Ethereum network without the need for login and passwords. At the same time, their decentralized identity is accompanied by the ability to serve as a value store that cannot be frozen, altered, or stolen by any government or private entity. Additionally, many of Harbor’s services can be viewed anonymously without the need to login to ease concerns of those fleeing from hostile/authoritative regimes.
<p align="center">
<img src="https://projectsafeharbor.com/wp-content/uploads/2017/12/logo@3x-1.png" alt="service provider view" style="width: 250px;"/>
</p>
Our goal is to provide refugees and with the tools they need to establish identity, access educational and job training opportunities, secure medical care, and reunite with family members - tools that are critical for successful resettlements, but are very difficult to accomplish today.

## Education & Job Training
With Harbor, the goal is to get short-term employment and education opportunities in front of refugees within days of arrival. Each completed class or training session is added as an attestation to their digital identity. Existing barriers to employment can be eased when our users are able to provide a biometrically secure, verifiable job history.

## Reuniting Families Through Facial Recognition
Harbor’s AI leverages open source biometric recognition [OpenBR](http://openbiometrics.org/) to perform a variety of facial recognition tasks, including age and gender estimation, 1:1 face match verification, and 1:N face match identification. This enables our platform to become a powerful reunification tool that gives families that have been torn apart by economic, political, or natural disasters, a chance at being reunited on an opt-in basis. Even if years have passed, Harbor can accurately identify family from a photograph alone.

## Video


### Prerequisites
* [Node](https://nodejs.org/)
* [Docker](https://www.docker.com/community-edition)
* [MongoDB](https://www.docker.com/community-edition)
* [HarborBiometrics](https://github.com/EthVentures/HarborBiometrics)


### Building

1. Start the [HarborBiometrics](https://github.com/EthVentures/HarborBiometrics) docker image.
2. Spin up an instance of MongoDB to store user information
```bash
mongod —dbpath .
```
3. Start the NodeJS Server middleware by navigating to HarborApp/server
```bash
cd server
npm install
node server.js
```
4. Build Ionic App from project root directory for iPhone
```bash
npm install
ionic build && ionic cordova run ios --device --c --livereload
```



### Team

[![EthVentures](https://github.com/EthVentures/CryptoTracker/raw/master/resources/img/ethventures-logo.png)](https://ethventures.io)
