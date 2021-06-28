# Quick'n Dirty HTTP session PoC

This code is just a small PoC about:

- session client side
- storage client side
- session server side
- persistence layer server side

Used express-generator for the backend

# install

Node version 14 at least.

```
npm install
```

# launching

```
npm run dev
```

This will simultaneously:

* launch express for the backend (with nodemon)
* build all frontend files, start a webserver (with parcel2)

Get the frontend url from `[frontend]` logs `server running at`
and browse it.