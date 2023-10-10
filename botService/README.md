# Yalmo Server

Based on MERN (MongoDB Express.js React.js Node.js) boilerplate https://github.com/djizco/mern-server .

A Server Part of Full MERN Stack Boilerplate for Web Apps. Includes a local authentication system using passport. User is given a simple profile with Full Name and Profile Picture. User is also able to reset password and username case.

This project is meant to be used alongside [MERN Client](https://github.com/djizco/mern-client).

## Requirements

### For Windows 10+
* [Node.js](https://nodejs.org/)
* Mongo Db (Install the msi from here - https://www.mongodb.com/try/download/community)

### For WLS (Windows Subsystem for Linux), MacOS or Linux
* [Node.js](https://nodejs.org/) (I recommend installing with [NVM](https://github.com/nvm-sh/nvm))
* [Homebrew](https://brew.sh) (to install MongoDB)


## Quick Start

### Setup

```bash
npm install --force
```

#### For WLS (Windows Subsystem for Linux), MacOS or Linux

* Install MongoDB
```bash
brew tap mongodb/brew
brew install mongodb-community
```

* Start the database
```bash
brew services start mongodb-community
```

&emsp;&emsp; If it's not working, use:
```bash
mongod --config /home/linuxbrew/.linuxbrew/etc/mongod.conf
```
### Run For Development and Production

Start the server
```bash
npm start
```

#### Other Commands

```bash
npm test
npm run lint
npm run lint:fix
npm run test:verbose
npm run test:watch
```

## Code Structure

```
- server
  - passport
  - database
  - routes
- config
- scripts
```

## Technologies

[Express](http://expressjs.com/) - Node Application Framework

[MongoDB](https://www.mongodb.com/) - Document Database

[Mongoose](http://mongoosejs.com/) - MongoDB Framework

[Passport](http://www.passportjs.org/) - Authentication Framework

[Ramda](http://ramdajs.com/) - Functional Library

[ESLint](http://eslint.org/) - Code Linter

[Jest](https://jestjs.io/) - Testing Framework
