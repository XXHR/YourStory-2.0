
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



## Backlog

[![Stories in Ready](https://badge.waffle.io/XXHR/YourStory-2.0.png?label=ready&title=Ready)](https://waffle.io/XXHR/YourStory-2.0)
