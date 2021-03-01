<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** tapfunds, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/tapfunds/tf">
    <img src="images/logo2.svg" alt="Logo" width="500" height="500">
  </a>

  <h3 align="center">Tap into your money</h3>

  <p align="center">
    Your hub for money transfers between personal accounts
    <br />
    <a href="https://github.com/tapfunds/tf"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/tapfunds/tf">View Demo</a>
    ·
    <a href="https://github.com/tapfunds/tf/issues">Report Bug</a>
    ·
    <a href="https://github.com/tapfunds/tf">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



The Tapfunds service is built to expand my knowledge of multi service architecture. This is opposed to having one monolithic code base. Multi service architecture is unnecessary for a project such as this. A single Go/python/JS/ application can do everything each service does and run performately for a portfolio app. This is meant to practice a high value skill. Decoupled containerized applications are easier to build in my opinion, but require a different way of thinking about application deployment. I hope whoever visits this learns something benficial or will provide feedback via issues or pull request. Request environment variables via email, or use your own for local development.


### Built With

* [Go]()
* [React]()
* [Python]()
* [Neo4j]()
* [Postgres]()
* [Node]()
* [Docker]()
* [Google CLoud Run]()

**Not yet implemented currently using Cloud Run and REST communication**
* [RabbitMQ]()
* [GKE]()



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Docker, node, python, golang, and the GCP SDK

* run this shell script to stand up local containers
  ```sh
  ./build-dev
  ```
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/tapfunds/tf.git
   ```
2. To install the auth and plaid services, cd into each folder then run 
   ```sh
   go get
   ```
3. To install the objectmapper service, cd into the folder and run 
   ```sh
   pip3 install requirements/requirements.txt
   ```
4. To install the client service, cd into the folder and run 
   ```sh
   yarn install
   ```

<!-- USAGE EXAMPLES -->
## Usage

Homepage

User auth

Account Auth

Service communication

CI/CD

Orchestration

DB models

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/tapfunds/tf/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/Qwelian_Tanner) - qwelian@tapfunds.net

Project Link: [https://github.com/tapfunds/tf](https://github.com/tapfunds/tf)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/tapfunds/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/tapfunds/tf/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tapfunds/repo.svg?style=for-the-badge
[forks-url]: https://github.com/tapfunds/tf/members
[stars-shield]: https://img.shields.io/github/stars/tapfunds/repo.svg?style=for-the-badge
[stars-url]: https://github.com/tapfunds/tf/stargazers
[issues-shield]: https://img.shields.io/github/issues/tapfunds/repo.svg?style=for-the-badge
[issues-url]: https://github.com/tapfunds/tf/issues
[license-shield]: https://img.shields.io/github/license/tapfunds/repo.svg?style=for-the-badge
[license-url]: https://github.com/tapfunds/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/qdt
