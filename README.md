
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
    1. [Active Contributors](#active-contributors)
1. [Contributing](#contributing)

<br>


## Requirements

- Node    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;version 6.7.0+
- PostgreSQL &ensp;&ensp;&ensp;&ensp;version 9.6.1+
- PostgreSQL &ensp;&ensp;&ensp;&ensp;version 56.0.2924.87+

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
<img src="https://developer.chrome.com/static/images/chrome-logo_2x.png" width="100px">|<img src="http://pblackops.github.io/react/images/react.png" width="100px">|<img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png" width="100px">|<img src="https://www.webshrinker.com/wp-content/uploads/2016/06/logo.png" width="100px"> | <img src="https://raw.githubusercontent.com/bgilham/HaveIBeenPwned-Alfred/master/docs/hibp_logo.png" width="100px"> 
:---: | :---: | :---: | :---: | :---: |
Chrome Platform APIs|ReactJS|Redux|WebShrinker API|haveibeenpwned API

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/540px-Postgresql_elephant.svg.png" width="100px"> | <img src="http://i.imgur.com/hi6gCzf.png" width="100px">|<img src="http://i.imgur.com/jK9PTgu.png" width="100px">
:---: | :---: | :---: |
PostgreSQL|Nodejs|Express.js

<br>

### Active Contributors
<img src="https://lh6.googleusercontent.com/s56NQmyb7njzlNHjQBdqy6--QJRAHvbZCYACGcuK7a5dQI90w84-udk4ghBbHy_ugOP_oXmiOmSQun0=w1275-h734" width="100px"> <br> Melba Madrigal|<img src="https://lh5.googleusercontent.com/32HqRp4Y3-0zkcFqtgX3rWOQ3P3pigHPele129dT6mkQG8vM0eEHT-cyqx_QwE3KKb-LjxOX4NO7TKA=w1284-h599" width="100px"> <br> Natasha Thapliyal
:---: | :---:
[LinkedIn](https://www.linkedin.com/in/melbamadrigal/) <br> [Github](https://github.com/melbee)| [LinkedIn](https://www.linkedin.com/in/natashathapliyal/)<br>[Github](https://github.com/natasha-t)


<br>

## Backlog

[![Stories in Ready](https://badge.waffle.io/XXHR/YourStory-2.0.png?label=ready&title=Ready)](https://waffle.io/XXHR/YourStory-2.0)
<br>