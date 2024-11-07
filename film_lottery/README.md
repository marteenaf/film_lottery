# Film Lottery (Front-end)

A project for a little app that allows users to create lists of movies together and randomly pick one to watch.

Demo [here](https://filmlottery.netlify.app/sign-up)

## Project setup

### Local Development

For this repo to work you will need to set-up a database in mongo, the backend repo and an auth key for "the big movie databse" --> follow instructions [here](https://github.com/marteenaf/film_lottery_backend)

Once you have setup a database and the back-end, add an .env file in your root directory with the following template:

```{env file}
VUE_APP_BACKEND_URL='http://localhost:<Backend port number>'
VUE_APP_BASE_URL='http://localhost:<Frontend port number>'
VUE_APP_MONGO_DATABASE='<database name>'
VUE_APP_MONGO_LIST_COLLECTION='<collection name for lists>'
```

Once the above is set up run:
```
npm install
npm run dev
```

### Run local development on mobile

...

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
