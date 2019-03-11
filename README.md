# Football Statistics

Coding exercise to show dummy statistics about football teams, players and games

## Technologies used

- [React](https://github.com/facebook/react) bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Typescript for type checking
- [Axios](https://github.com/axios/axios) for Promise based HTTP requests
- [Reach router](https://reach.tech/router) for routing
- [Ant](https://ant.design/docs/react/introduce) as a styling library
- [Moment](https://momentjs.com/) for handling dates

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

I orginally made a fresh query to the API on each page, followed by a second query to get further information
<br>
e.g. to get the data for a particular player, I sent a post with a with a body containing the player's id to

```
/api/teams/players
```

This contained a history array of objects which had team_ids rather than team names, so I had to make a second query to the teams api

<br />
This mean that there were significant delays each time the user navigated to a new page.
<br>

I considered setting up a GraphQL server. This would bring the following benefitis:

- I would only need to make one query each time (avoids under fetching)
- I would not fetch unneeded data (avoids over fetching)
- My front end would be built in a more sustainable pattern, not dependent on the shape of the back end
- I could later add authentication on the 'add a game' endpoint

However, I decided that a more lightweight approach would be to fetch all the data on application load and create my own date store. I felt this was appropriate because the data size was small, it was unlikely to become stale and it would make the UX seameless (after an initial load).

I chose to use Context and React's new 'hooks' feature to share the data.

Having completed the exercise, I feel that I brought too much logic into the front end. This would have been better abstracted to either GraphQL or directly on the backend.
