# Anagram.io

An app for finding anagrams

## Getting started

### Prerequisites 📋
- Node
- A Mongo Database
- A GCP Account

You can boot up a MongoDB locally or create one on Atlas if you like.
You'll need to head into GCP and create an OAuth2.0 client ID and secret

### Setup 👷‍♀️

First things first get everything installed with the ol'

```bash
npm ci
```

then you'll need to create a `.env` file in the root of the project. You'll need to add your Google client ID and secret, your MongoDB connection string and some other bits. The file should look like this

```
GOOGLE_CLIENT_ID="<your_client_id>"
GOOGLE_CLIENT_SECRET="<your_secret>"
NEXTAUTH_SECRET="<some_long_string_you_generate>"
MONGODB_CONNECTION_STRING="<your_connection_string>"
NEXTAUTH_URL=http://localhost:3000
```

### Boot up 🚀

You're ready to start the app up in either dev mode by running

```
npm run dev
```

or build the app and run the build with

```
npm run build
npm start
```

## Using the thing 🤾‍♀️

When the app first boots you won't be able to find any anagrams for any words you type in. This is because there won't be any words in your database yet. Don't fret. Navigate to `/upload-dictionary` and submit some in JSON format. Your dictionary should be an object where each key is a word each value is a definition. For example

```JSON
{
  "iceman": "A dude made of ice",
  "cinema": "A place where you watch movies",
  "3D": "Abriv. Three dimensional",
  "3-D": "See 3D"
}
```

You file must be less than 30mb. 

I tested against this file which contains approximately 107,000 words https://github.com/matthewreagan/WebstersEnglishDictionary/blob/master/dictionary.json. This is much faster than writing your own dictionary by hand so I recommend seeding with this at least.

## Testing 👩‍🔬

There are two suites of tests, one written with Jest covering units and some integration, the other written with cypress to cover fuller flows.

The jest tests can be run with

```
npm test
```

or in watch mode with

```
npm run test-watch
```

The cypress tests can be run headless with

```
npm run test:e2e
```

or in open mode with

```
npm run test:e2e:open
```

## The future 🔮

- Try deploying this to vercel with a database hosted on Atlas
- CI/CD with GH Actions
- Add test coverage to the upload dictionary functionality
- Separate upload dictionary into an admin area locked down with RBAC
- Let users specify a language for both the uploaded dictionary and the searched word
- Mark some words as NSFW
