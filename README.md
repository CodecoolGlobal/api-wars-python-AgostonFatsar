<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![agoston][agoston-linkedin-shield]][agoston-linkedin-url]

# ApiWars

---

## About the Project
The application provides information about the planets of the Star Wars universe, using APIs to load data.

* Listing planets
* Listing known residents
* Voting on planets for registered users


---
## Tech Stack

### Backend
* [![Python][Python]][Python-url]
* [![Postgres][PostgreSQL]][postgres-url]

### Frontend

* ![Javascript][Javascript]
* [![Bootstrap][Bootstrap]][Bootstrap-url]

---

## Prerequisites

* Install Python and virtalenv
* Install PostgreSql
* Create PostgreSql database

## Installation

1. Clone the repository of the project.

```bash
git clone https://github.com/CodecoolGlobal/api-wars-python-AgostonFatsar
```

2. Set up some environment variables in the .env file
    - PSQL_DB_NAME
    - PSQL_HOST
    - PSQL_USER_NAME
    - PSQL_PASSWORD


3. Run the data/init_database file in your PostgreSql database.


4. Create and activate virtual environment.

    ```bash
    virtualenv venv
    source venv/bin/activate
    ```

5. Install requirements.

    ```bash
    pip install -r requirements.txt
    ```


## Running the application

1. After installation, you can use run.sh to start the server.


[contributors-shield]: https://img.shields.io/github/contributors/CodecoolGlobal/api-wars-python-AgostonFatsar.svg?style=for-the-badge
[contributors-url]: https://github.com/CodecoolGlobal/api-wars-python-AgostonFatsar/graphs/contributors
[agoston-linkedin-shield]: https://img.shields.io/badge/-Fatsar_Ágoston-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[agoston-linkedin-url]: https://www.linkedin.com/in/agoston-fatsar/


[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org

[Bootstrap]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

[PostgreSQL]: https://img.shields.io/badge/Postgresql-20232A?style=for-the-badge&logo=postgresql
[postgres-url]:https://postgresql.org

[Javascript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black

