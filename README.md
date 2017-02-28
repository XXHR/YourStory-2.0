
# YourStory
#### Do you think you know how you spend your time on the web? YourStory allows you to securely and easily visualize your personal browsing habits.

http://www.getyourstory.us

## Table of Contents
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Usage](#usage)
1. [Overview](#overview)
    1. [Technology Stack](#technology-stack)
    1. [Team](#team)
1. [Contributing](#contributing)

<br>


## Requirements

- Node    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;version 6.7.0+
- PostgreSQL &ensp;&ensp;&ensp;&ensp;version 9.6.1+


<br>

## Development

### Installing Dependencies
After downloading the project, from within the root directory, run the following command:

```sh
npm install
```

<br>

## Usage

#### Before uploading the Public directory into the browser you will need to run the commands listed below. 

Go into client/content directory and run the following command:
```sh
webpack --watch
```
<br>
Go into client/event directory and run the following command: 
```sh
webpack --watch
```
<br>
From your PostgreSQL terminal, create a database called 'testyourstory'
<br>
Start the server from the root of the app by running the following command:
```sh
npm start
```
<br>
Go to chrome://extensions/ in your Chrome browser. Select the 'Developer mode' option on the top right of the screen. Then click the 'Load unpack extension...' button and upload the Public directory.

<br>


## Overview

### Technology Stack
<img src="https://developer.chrome.com/static/images/chrome-logo_2x.png" width="150px">|<img src="http://pblackops.github.io/react/images/react.png" width="150px">|<img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png" width="150px">|<img src="https://www.webshrinker.com/wp-content/uploads/2016/06/logo.png" width="150px"> | <img src="https://raw.githubusercontent.com/bgilham/HaveIBeenPwned-Alfred/master/docs/hibp_logo.png" width="150px"> 
:---: | :---: | :---: | :---: | :---: |
Chrome Platform APIs|ReactJS|Redux|WebShrinker API|haveibeenpwned API

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/540px-Postgresql_elephant.svg.png" width="150px"> | <img src="http://i.imgur.com/hi6gCzf.png" width="150px">|<img src="http://i.imgur.com/jK9PTgu.png" width="150px">
:---: | :---: | :---: |
PostgreSQL|Nodejs|Express.js


### Active Contributors
[![MelbaMadrigal](https://drive.google.com/open?id=0B2Xw4V3X-KXpTzA0aG1jUUhvVHM)](https://github.com/melbee) <br>Melba Madrigal| [![NatashaThapliyal](https://drive.google.com/open?id=0B2Xw4V3X-KXpdWlDMlRFVzQwaTg)](https://github.com/natasha-t) <br>Natasha Thapliyal
:---: | :---: |
[LinkedIn](https://www.linkedin.com/in/melbamadrigal/)<br>| 
[LinkedIn](https://www.linkedin.com/in/natashathapliyal/)<br>| 


<br>

## Contributing
See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

<br>

## Backlog

[![Stories in Ready](https://badge.waffle.io/XXHR/YourStory-2.0.png?label=ready&title=Ready)](https://waffle.io/XXHR/YourStory-2.0)
<br>