<div id="top"></div>

<!-- PROJECT BANNER -->

![registration](https://user-images.githubusercontent.com/36320943/152290610-3b02fa0d-f43e-42da-8ced-d366b6ab1530.png)

<!-- PROJECT HEADING -->

<div align="center">
    <h1 align="center">Football Registration</h1>
    <p align="center">
        <h4>Registering for a football club by filling up the registration form.</h4>
        <!-- PROJECT SHIELDS -->
        <a href="https://open.vscode.dev/amarjeetmalpotra/football-registration-form">
            <img src="https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20VSCode&labelColor=2c2c32&color=007acc&logoColor=007acc" alt="VS Code"></img>
        </a>
        <a href="https://github.com/amarjeetmalpotra">
            <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" alt="Open source"></img>
        </a>
        <a href="https://gitHub.com/amarjeetmalpotra/football-registration-form/commits/">
            <img src="https://badgen.net/github/commits/amarjeetmalpotra/football-registration-form" alt="Commits"></img>
        </a>
        <a href="https://gitHub.com/amarjeetmalpotra/football-registration-form/commit/">
            <img src="https://badgen.net/github/last-commit/amarjeetmalpotra/football-registration-form" alt="Commit"></img>
        </a><br />
        <a href="https://github.com/amarjeetmalpotra/football-registration-form/issues">Report Bug</a> ·
        <a href="https://github.com/amarjeetmalpotra/football-registration-form/issues">Request Feature</a>
    </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Football Registration](https://user-images.githubusercontent.com/36320943/153801178-3509bb22-bc66-4736-a97e-4b52226ba1e5.png)

Preparing a Football Registration Form in which the user will be able to enter various details to register for a Football tournament.

What's inside:

- The user will be required to input various details such as "First name", "Email", "Desired position", etc.
- After submitting the form, a message will show up that the form has been submitted and then repopulate data in the form for the user to edit the fields.
- After retrieval, if the user edits any field and submit, then the already existing entries in the database are updated. Finally a message that the form has been updated is shown.

Of course, a lot of other things are there, but will know more about them later 😉

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

Here are some major technologies, frameworks, libraries or plugins used to bootstrap this project. For any suggestions, feel free to <a href="https://github.com/amarjeetmalpotra/football-registration-form/issues">Request Feature</a>.
<br /> <br/>
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![SQL Server](https://img.shields.io/badge/Microsoft_SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)

### Additional dependencies

- [CountriesNow API](https://countriesnow.space), for Countries, States, Cities and their dial codes.
- [Spring data JPA](https://spring.io/projects/spring-data-jpa), provides abstraction that makes working with the JPA provider less verbose.
- [Lombok](https://projectlombok.org), for minimizing/removing the boilerplate code.
- [Jsoup](https://jsoup.org), for sanitizing untrusted HTML (to prevent XSS).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is how we can set things up to be able to run it locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

Before getting started, we need to set few things up.

1. Make sure you have JDK 11+ and related path in place and could confirm this

   ```sh
   java --version
   ```

2. Make sure you have Microsoft SQL Server installed and then setup the database
   - Open Microsoft SQL Server Management Studio.
   - From the side panel, right click Databases and select New Database.
   - Name the database as `football_registration`
   - And finally, you need to your db credentials in `application.properties` file.
   - Alternatively, you can specify your existing database and make changes to `application.properties` file accordingly.
3. Make sure you have an IDE available as well, preferably IntelliJ IDEA to ease up things a lot.

And now we are ready to roll.

### Installation

So, this is how we can install and set things up.

1. Clone the repo

   ```sh
   git clone https://github.com/amarjeetmalpotra/football-registration-form.git
   ```

2. Open the directory `football-registration-form` as a project in IntelliJ IDEA

3. You can now straight away Run or Debug from the top left corner in IntelliJ IDEA

4. For non IntelliJ IDEA users or to run from command line

   ```sh
   gradlew bootRun
   ```

5. Open your favourite web browser and navigate to `localhost:8080`

And this should bring you to the registration form 😉

### A word of warning!

In `application.properties` file, Hibernate ddl auto is set to `create-drop` which is for development use, for production consider setting it to `validate` or just remove that property.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Front-end
  - [x] Setting up structure
  - [x] Cover up UI
  - [x] Setup client side validations
- [x] Back-end
  - [x] Setup REST architecture
  - [x] Setting up entities and DTOs
  - [x] Endpoint validation and sanitzations
- [ ] Optimizations

(Subject to change)

See the [open issues](https://github.com/amarjeetmalpotra/football-registration-form/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch `git checkout -b feature/AmazingFeature`
3. Commit your Changes `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch `git push origin feature/AmazingFeature`
5. Open a Pull Request 😉

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GPL-v3.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Amarjeet Malpotra - LinkedIn [@malpotra](https://linkedin.com/in/malpotra) - [amarjeetmalpotra.github.io](https://amarjeetmalpotra.github.io)

Project Link: [https://github.com/amarjeetmalpotra/football-registration-form](https://github.com/amarjeetmalpotra/football-registration-form)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Below is the list of resources I found helpful and would like to give credit to. Do have a look to kick things off!

- [Choose an Open Source License](https://choosealicense.com)
- [Img Shields](https://shields.io)
- [GitHub Pages](https://pages.github.com)
- [Bootstrap](https://getbootstrap.com)
- [CountriesNow API](https://countriesNow.space)
- [Project Lombok](https://projectlombok.org)
- [Jsoup](https://jsoup.org)
- [Baeldung](https://www.baeldung.com)
- [Postman](https://www.postman.com)

<p align="right">(<a href="#top">back to top</a>)</p>
