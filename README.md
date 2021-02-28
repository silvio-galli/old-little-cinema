# Old Little Cinema

## MERN application

This is a draft for an administration panel to manage events of a cinema.

You can try a demo on [Heroku](https://old-little-cinema.herokuapp.com)

Please, note that the application can be very slow the first time you access it, because the heroku service can be in sleeping mode and need some time to activate and respond to your first request.

---

If you want to try the app locally you need have NodeJS and MongoDB installed on your pc ( information to install Node [here](https://nodejs.org/en/download/) or [here](https://github.com/creationix/nvm#installation) and for MongoDB [here](https://docs.mongodb.com/manual/administration/install-community/) ).

Then, clone this repository:

```bash
git clone --depth=1 git@github.com:silvio-galli/old-little-cinema.git
```

Change your directory:

```bash
cd old-little-cinema
```

Install all the dependencies:

```bash
npm install
```

Then, in order to run the application, you need to have two terminal windows opened (one for the backend and one for the frontend).
On one run this command:

```bash
npm run dev:server
```

On the other terminal, run:

```bash
npm run dev:client
```

### Files to add

You should have a `server/.env` file, with the following values:

`MOVIEDB_API_KEY=....`

To query theMovieDB API is mandatory to have a key to access the database. In order to have an API key you need to [create an account on www.themoviedb.org](https://www.themoviedb.org/account/signup) and then paste it in the `srevr/.env` file.

---

![Searching locally](https://user-images.githubusercontent.com/15610747/46479280-06ccdb00-c7ef-11e8-8779-df1322a5397a.png)

Fig. 1 - typing into the input field you will be filtering the movies already present in the local database

---

![Searching theMovieDB.org](https://user-images.githubusercontent.com/15610747/46480785-39c49e00-c7f2-11e8-9e24-3e68e7aa0d86.png)

Fig. 2 - If you don't find the movie you need into the local database, you can press `Enter` on your keyboard or click on `Search` button and you will query [themoviedb.org](http://themoviedb.org) database and the result of the query will be displayed on the left side.
To add the movie into the local db, click on `Add Movie` button.

---

![Editing movie](https://user-images.githubusercontent.com/15610747/46481128-f1f24680-c7f2-11e8-97b7-e4b85d88907a.png)

Fig. 3 - Once the movie is saved on the local database, you can click on the `Edit` button to edit the movie details.
On the right part of the page there is a panel used for editing movies and events.
When editing the movie, you can add some info like links to reviews and articles on the movie or the trailer link (TODO: query the youtube API to find the official trailer of the movie)

---

![Creating an event](https://user-images.githubusercontent.com/15610747/46481446-b441ed80-c7f3-11e8-9e3a-05f0401eb271.png)

Fig. 4 - Clicking on the `New Event` button, you can create a new event filling out the form the will appear.
