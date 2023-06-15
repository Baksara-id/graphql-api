<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div align="center" id="welcome">
</div>

<!-- # Welcome -->

[![Contributors][contributors-shield]][contributors-url]
[![Glenn's LinkedIn][linkedin-shield]][linkedin-url]
[![Okyan's LinkedIn][linkedin-shield]][linkedin-url-2]

<!-- PROJECT LOGO -->
<br />
<div align="center">

 <a href="https://github.com/baksara-id/graphql-api">
    <img src="images/graphql.png" alt="Logo" width="80" height="80">
    <img src="images/apollo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">GraphQL API</h3>

  <p align="center">
    Back-end implementation for our system
    <br />
    <a href="https://github.com/baksara-id/graphql-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/baksara-id/graphql-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/baksara-id/graphql-api/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#product-demo">Product Demo</a></li>
        <li><a href="#system-graph-and-flow">System Graph and Flow</a></li>
        <li><a href="#database-design">Database Design</a></li>
        <li><a href="#cicd-environment">CI/CD Environment</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#association">Association</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
### Product Demo

[![Product Name Screen Shot][product-screenshot]]()
This back-repository is a back-end service repository for Baksara. It provides the necessary functionality and logic to support the front-end of Baksara application. THis back-end service is responsible for handling tasks such as data storage, processing, and retrieval, as well as providing APIs for the front-end to interact with.

### System Graph and Flow

[![System Graph][system-screenshot]]()
The GraphQL service contains public service and private service. In this service, we are using the word `resolver` in terms of endpoint. Mainly, the public API consists of 
```js
loginUser()
```
for user login system and 
```js
createUser()
```
for creating user or user registration
### CI/CD Environment

[![System Graph][cicd-screenshot]]()
For the CI/CD Environment, we use Cloud Build with push trigger. When a revision / update to the code is pushed, the diagram as shown above will run the process of revision. Below are the services we use from Google Cloud Platform to develop CI/CD pipeline :
<ol>
    <li>
      Artifact Registry : To create the image on GCP registry
    </li>
    <li>
      Cloud Run : To run the application
    </li>
</ol>

### Database Design

[![Database Design][db-screenshot]]()
Above is the design of the database in our system.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![VSCode](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
- [![ApolloGraphQL][ApolloGraphQL.com]][ApolloGraphQL-url]
- [![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
- [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
- [![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- GETTING STARTED -->

## Getting Started

<br />
<div align="center">
  <img src="images/npm.png" alt="Logo" width="160" height="80">
</div>

Getting started, do follow the steps below thoroughly and carefully. Make sure all the prerequisities and installations are done correctly according to

### Prerequisites

Before getting started, make sure that NPM is already up to date.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_This is how you should clone and setup the API service on localhost. Do follow these steps carefully_ 
2. Clone the repo

```sh
git clone https://github.com/baksara-id/graphql-api.git
```

3. Install NPM packages
```sh
npm install
```
4. Inside the development and or test and or deployment in 
```js
    const config
``` 
  `index.js`, replace all information given according to your credential
   ```json
   "development": {
        "username": "DB_USERNAME", //usually root
        "password": "DB_PASSWORD", //usually ''
        "database": "DB_NAME", //fill accordingly
        "dialect": "DB_DIALETCT", //usually mysql
        "host": "DB_HOST", //usually 127.0.0.1
    }
   ```
5. Start your web server service

6. Make sure to import sql file to your database

7. Run the GraphQL with the command below :
* If you want to run the server in development mode :
```sh
   npm run dev
```
* If you want to run the server in production mode :
```sh
   npm run start
```
8. Open the link given at the terminal, and it should look like this :
```sh
   🚀 Server ready at http://localhost:4000
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

API is used for Baksara Application front-end, showing the user's data and showed real-time

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] User CRUD Operation
- [x] User Authentication
- [ ] Middleware
  - [x] User Middleware
  - [ ] Admin middleware

See the [open issues](https://github.com/baksara-id/graphql-api/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Glenn Steven Santoso - [LinkedIn][linkedin-url] - glennstevensantoso@gmail.com
- Okyan Awang Ramadhana - [LinkedIn][linkedin-url-2] - okyanawang@gmail.com

Project Link: [https://github.com/baksara-id/graphql-api](https://github.com/baksara-id/graphql-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Association

- [Bangkit](https://grow.google/intl/id_id/bangkit/?tab=machine-learning)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/baksara-id/graphql-api.svg?style=for-the-badge
[contributors-url]: https://github.com/baksara-id/graphql-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/baksara-id/graphql-api.svg?style=for-the-badge
[forks-url]: https://github.com/baksara-id/graphql-api/network/members
[stars-shield]: https://img.shields.io/github/stars/baksara-id/graphql-api.svg?style=for-the-badge
[stars-url]: https://github.com/baksara-id/graphql-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/baksara-id/graphql-api.svg?style=for-the-badge
[issues-url]: https://github.com/baksara-id/graphql-api/issues
[license-shield]: https://img.shields.io/github/license/baksara-id/graphql-api.svg?style=for-the-badge
[license-url]: https://github.com/baksara-id/graphql-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/glenn-steven-santoso-5a6934220/
[linkedin-url-2]: https://www.linkedin.com/in/okyan-awang-ramadhana/
[product-screenshot]: images/preview.png
[system-screenshot]: images/system.png
[cicd-screenshot]: images/cicd.png
[db-screenshot]: images/db.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[ApolloGraphQL.com]: https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql
[ApolloGraphQL-url]: https://www.apollographql.com/
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
