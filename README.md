## Sing me a Song API 🧰

<div align="center">
  <a href="https://toolz-api.herokuapp.com/tools">
    <img src="https://book.giflingua.com/images/origin/tols.gif" width="280px">
  </a>
    <br />
    <a href="https://toolz-api.herokuapp.com/tools">View the deploy</a>
    <br />
</div>

<br/>

## About

Need suggestions for which tools to use in your projects? Use Toolz! In this RestApi you can see the tools listed that can be useful in your project. Also, if you are authenticated, you can post and delete tools. Feel free to use and contribute!

<br/>

## Technologies

Tools that were used in the project:
<p>
  <img src='https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs'>
  <img src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express'>
  <img src="https://img.shields.io/badge/Jest-000000?style=for-the-badge&logo=jest&logoColor=c03c14"/>
  <img src='https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql'>
  <img src='https://img.shields.io/badge/TypeORM-000000?style=for-the-badge&logo=TypeORM'>
  <img src='https://img.shields.io/badge/eslint-000000?style=for-the-badge&logo=eslint&logoColor=472fb9'>
  <img src='https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=husky&logoColor=472fb9'>
  <img src='https://img.shields.io/badge/npm-000000?style=for-the-badge&logo=npm'>
  <img src='https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=docker'>
  <img src='https://img.shields.io/badge/Heroku-000000?style=for-the-badge&logo=heroku&logoColor=410093'>
  <img src='https://img.shields.io/badge/Swagger-000000?style=for-the-badge&logo=swagger'>
</p>

> For more see the [package.json](https://github.com/cgabrieu/toolz-api/blob/main/package.json)

<br/>

## Getting Started

To run locally follow the steps

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

<br/>

#### Docker
* ubuntu
```sh
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
```
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
```sh
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
<br>

* fedora
```sh
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```
```sh
sudo dnf install docker-ce docker-ce-cli containerd.io
```
<br>

* windows

<a href="https://docs.docker.com/desktop/windows/install/">Look here</a>


#### Docker compose
* ubuntu
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```sh
sudo chmod +x /usr/local/bin/docker-compose
```
<br>

* fedora
```sh
sudo dnf install docker-compose
```
<br>

* windows
```
already installed with the docker package
```
<br>
<br>

### How to run

1. Create the root folder named toolz-api and access it
```sh
mkdir toolz-api && cd toolz-api
```
2. Clone the repo
```sh
git clone https://github.com/cgabrieu/toolz-api.git
```
3. Run docker
```sh
sudo docker-compose up
```
4. Create a database using the command below via postgres
```sh
CREATE DATABASE singmeasong;
```
5. Automatically create all necessary tables to backend repo with <a href="https://github.com/cgabrieu/toolz-api/blob/main/dump.sql">dump</a>.

8. Connect your backend to the database, for that, rename the .env.example to .env.dev and fill in your data.

### How to run

1. Run using the command (remember to be on the repo):
```sh
npm run start:dev
```

## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`

## Developer

* [Carlos Gabriel](https://github.com/cgabrieu)


