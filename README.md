<p align="center">
<img src="https://github.com/EthVentures/HarborApp/raw/master/src/assets/safeharborlogo.png" alt="service provider view" style="width: 200px;"/>
</p>


# Welcome to Project Safe Harbor
[Project Safe Harbor](https://projectsafeharbor.com) is an open source platform that leverages blockchain and artificial intelligence to enable societies and communities to provide basic resources, safety, and security to the more than 65 million asylum seekers around the world.

This project launched in December 2017 as a submission to the [World Virtual Govhack](http://hackathon.govtechprize.ae/) hackathon. We focus on the top challenges asylum seekers face - **establishing identity**, **accessing educational and job training opportunities**, **securing medical care**, and **reuniting with family members**.

Home Screen | Refugee View | Service Provider View
--- | --- | ---
<img src="https://github.com/EthVentures/HarborApp/raw/master/src/assets/ss1.png" alt="safe harbor home screen" style="width: 250px;"/>| <img src="https://github.com/EthVentures/HarborApp/raw/master/src/assets/ss2.png" alt="refugee view" style="width: 250px;"/>| <img src="https://github.com/EthVentures/HarborApp/raw/master/src/assets/ss3.png" alt="service provider view" style="width: 250px;"/>

## Establishing Identity
All individuals, including refugees and asylum seekers, have a fundamental right to a digital identity; a secure, digital identity that they themselves control. Without a secure digital identity, refugees are in a constant struggle to settle. Harbor’s identity service, which is powered by [uPort](https://uport.me/), allows refugees and asylum seekers to quickly and easily establish a secure, self-sovereign identity that interacts with the Ethereum network without the need for login credentials. Harbor’s decentralized identity service serves as a value store for refugees; a value store that cannot be frozen, altered, or stolen by malicious governments, private entities, or the like. In some contexts, though, like in cases where people are fleeing from hostile or authoritarian regimes, refugees may not want activities to be associated with an identity. To address the issue, many of Harbor’s services provide the openness needed to be used anonymously.

## Accessing Education & Job Training
Education provides individuals with an opportunity to learn new skills.These skills, in turn, allow individuals to productively apply themselves in society, and earn a reasonable income to support their families. As such, it should be no surprise that education is crucial for successful resettlements. Harbor not only gets educational opportunities in front of refugees, but also short-term employment opportunities, all within days of arrival. In addition, educational achievements and work experience are attached, on the blockchain, to a refugee’s digital identity. Though putting opportunities in front of refugees, and recording, in a biometrically secure and verifiable way, refugees’ education and job history, Harbor is breaking down barriers to integration and brining confidence to refugees and societies alike.

## Securing Medical Care
Access to and use of medical care contributes to human longevity, and an increased quality of life. In addition, it ensures that societies are healthy and properly functioning. Often, refugees and asylum seekers haven’t received needed medical care in years (if at all), or are more generally in poor health. In these scenarios, health becomes a barrier to successful resettlements. Through Harbor, refugees can get the medical care that they deserve. In addition, much like educational achievements and work experience, medical care records are attached, on the blockchain, to a refugee’s digital identity. Through offering medical care, and recording it in a biometrically secure and verifiable way, refugees can safely address health concerns and improve health outcomes, leading to more successful settlements.

## Reuniting Families

Families around the world are torn apart by economic, political, or natural disasters. Harbor’s AI leverages open source biometric recognition [(OpenBR)](http://openbiometrics.org/) to perform a variety of facial recognition tasks, including age and gender estimation, 1:1 face match verification, and 1:N face match identification, which enables our platform to not only be biometrically secure, but also serve a powerful tool for reunification (on an opt-in basis). For instance, if a family has been separated by a disaster, Harbor’s 1:N face match identification makes it easy to determine if a family member is located at a participating refugee camp. Even if years have passed, Harbor can, from a photograph alone, accurately identify family members and the camps they’ve visited.


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
