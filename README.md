# A2BBAdminApp

This project is part of a bigger one, namely Angular 2 Beyond Browser (A2BB), and it is an desktop app made with [Electron](https://electron.atom.io/) implementing a very simple administrative panel for an administrator of the A2BB system.

The projects which are part of A2BB are:
* [A2BBServer](https://github.com/marcuson/A2BBServer)
* [A2BBAdminApp](https://github.com/marcuson/A2BBAdminApp)
* [A2BBUserSPA](https://github.com/marcuson/A2BBUserSPA)
* [A2BBMobileApp](https://github.com/marcuson/A2BBMobileApp)
* [A2BBGranter](https://github.com/marcuson/A2BBGranter)

and they have been developed as a demo to show the potentials of Angular2 - ASP.NET Core - Arduino technologies during a TechItalian meetup
(see [event here](https://www.meetup.com/TechItaliaTuscany/events/237721715)).

For an A2BB system description, please see [A2BBServer](https://github.com/marcuson/A2BBServer).

If you want to know more about TechItalians, see [TechItalia Tuscany MeetUp page](https://www.meetup.com/it-IT/TechItaliaTuscany/).

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3. To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Prerequisites

You need to have [NPM](https://www.npmjs.com/) installed (see [installation guide](https://docs.npmjs.com/getting-started/installing-node)). After that, open a terminal and issue this command to install needed dependencies:  
`npm install -g @angular/cli@1.0.0-beta.28.3 copyfiles`  
Then, from the terminal, go to the project root directory and type:  
`npm install`

## Run in development mode
Run `npm run electron` to build and start the app in development mode.

## Build

Run `npm run electron-dist` to build the project. The build artifacts will be stored in `A2BBAdminApp-win32-***` directories. At the moment the build scripts are configured to build output for Windows only, but it should be easy enough to tweak the `package.json` file and produce outputs for OSX and Linux based computers.
