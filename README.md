# Football Statistics

Coding exercise to show dummy statistics about football teams, players and games

## Technologies used

* [React](https://github.com/facebook/react) bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Typescript for type checking
* [Axios](https://github.com/axios/axios) for Promise based HTTP requests
* [Reach router](https://reach.tech/router) for routing
* [Ant](https://ant.design/docs/react/introduce) as a styling library
* [Moment](https://momentjs.com/) for handling dates


You can view a live version [here](https://football-statistics.netlify.com/) 

## Cloning the project

 ```
    git clone https://github.com/JonathanHalpern/football-statistics
    cd ./football-statistics
    yarn or npm i
 ```

## Available Scripts

In the project directory, you can run:

### `yarn or npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test or npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build or npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Architectural decisions

### Framework

I chose to use React instead of VUE because I have more experience with this technology. I believe the end result would be very similar either way.

### Data
There were thee options for handling data in the app
1. On each page, make a fresh query to the API, followed by a second query using keys from the first
e.g. to get the data for a particular player
```
/api/teams/players
```
with a body containing the player's id.
The returned data included ids for the teams that player had played for, so another query to
```
/api/teams
```
with a body containg the team's id was needed to find the team's name.
<br />
This mean that there were delays each time the user navigated to a new page.
<br>

I considered setting up a GraphQL server. This would bring the benefitis of:
* I would only need to make one query each time (avoids under fetching)
* I would not fetch unneeded data (avoids over fetching)
* My front end would be built in a more sustainable pattern, not dependent on the shape of the back end

However, I decided that a more lightweight solution would be to fetch all the data on application load, then reference my own store. I felt this was appropriate because the data size was small and it would make the UX seameless (after an initial load).

I chose to use Context to share the data rather than redux because my data set was small.
