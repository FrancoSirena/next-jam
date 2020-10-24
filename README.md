## Goal
This is a try out on nextjs and the Spotify web-api just for fun.
To make that happen I created a custom server with nextjs and instead of hitting the Spotify API directly from the client I encapsulated it all on server endpoints, which I have control over.

Just a fun project to play with `nextjs`

## Running locally

Run the development server:

```bash
npm run dev:custom
# or
yarn dev:custom
```

Go to http://localhost:3000 and check it out

## Structure

[api]: Folder with all the custom endpoints of this server. They are all using the Spofity API documentation that you check on https://developer.spotify.com/documentation/web-api/

[pages]: User accessible pages, most of them are using server based data, but some, like the current playing, are actually client based data which is controlled by a hook called `useRequest`

[styles]: All css related to the pages, we are using scss modules here to avoid css conflicts.
