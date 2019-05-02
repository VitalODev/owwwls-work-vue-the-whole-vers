<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm11 md10 xl8>
        <div class="div-spacer">
          <h1 :style="{ fontSize: computedStyle.fontSizeH1 }">Reinforced authentication with Koa.js and Vue.js</h1>

          <v-breadcrumbs>
            <v-breadcrumbs-item disabled>Preparation</v-breadcrumbs-item>
          </v-breadcrumbs>

          <v-breadcrumbs divider="-">
            <v-breadcrumbs-item disabled>Server-side</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#env-server', { duration: 1000 })">Setting up the environment</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#data-model', { duration: 2000 })">Data model</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#passport', { duration: 2100 })">Passport.js</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#router', { duration: 2200 })">Router.js</v-breadcrumbs-item>
          </v-breadcrumbs>

          <v-breadcrumbs divider="-">
            <v-breadcrumbs-item disabled>Client-side</v-breadcrumbs-item>
            <v-breadcrumbs-item  @click="$vuetify.goTo('#env-client', { duration: 2300 })">Setting up the environment</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#auth-component', { duration: 2300 })">Auth component</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#vuex', { duration: 2500 })">Vuex</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#auth-state', { duration: 2600 })">Auth state visualization</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#the-final', { duration: 2700 })">The final</v-breadcrumbs-item>
          </v-breadcrumbs>

          <h2 :style="{ fontSize: computedStyle.fontSizeH2 }">Preparation</h2>
          <p :style="{ fontSize: computedStyle.fontSizeP }">This article is a manual for the creation of an authentication system from this repository. It's implied that you're familiar with JavaScript, Koa.js, Vue.js, HTML, CSS because it won't be described here how these technologies work. Although I'm going to describe the whole process as thoroughly as possible.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Why is 'reinforced' authentication? Let's talk a little about approaches to authentication. There're two most popular variants on the web. The first is based on the server session mechanism, the second on the transfer of a certain token. We'll use the second one as it's more universal because of its support by gadgets is greater. The next step is to determine where the token will be placed on the client side. Again, we have two commonly encountered options for this: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">localStorage</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" target="_blank">cookie</a>. In terms of authentication, the most important aspect which storage should be used is the security of storing data. Neither the first nor the second are perfect. LocalStorage suffers from a vulnerability known as <a href="https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting" target="_blank">XSS</a>. Cookies are subject to <a href="https://developer.mozilla.org/en-US/docs/Glossary/CSRF" target="_blank">CSRF</a> attack. And what if a user authentication depends on local storage and cookies together? The task of hacking this mechanism on a distance becomes overly difficult. That's why this is 'reinforced' authentication.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">If Node.js is not installed on the machine - install <a href="https://nodejs.org/uk/download/" target="_blank">it</a>. Also in this manual, as a more efficient alternative for <a href="https://docs.npmjs.com/about-npm/" target="_blank">npm</a>, the <a href="https://yarnpkg.com/lang/en/" target="_blank">Yarn</a> manager will be used to install external packages. We'll use <a href="https://eslint.org/" target="_blank">ESLint</a> with Vue.js rules as a linter for both Vue.js and Koa.js.</p>
          <h2 :style="{ fontSize: computedStyle.fontSizeH2 }">Server-side</h2>
          <h3 id="env-server" :style="{ fontSize: computedStyle.fontSizeH3 }">Setting up the environment</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Create a folder with the name of the project on your local machine. In the terminal of the operating system, go to this folder and initialize the package manager - <kbd>yarn init -y</kbd>.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">If you need a git repository, it's time to create a <var>.gitignore</var> file and add to exceptions <code>node_modules</code> and other files that shouldn't be committed.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Install ESLint and needful plugin due <kbd>yarn add -D eslint eslint-plugin-vue-libs</kbd> in the terminal. Create a configuration file for ESLint <var>.eslintrc.js</var> and place the code:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  module.exports = {
    extends: ['plugin:vue-libs/recommended'],
    rules: {
      'no-console': process.env.NODE_ENV
      === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV
      === 'production' ? 'error' : 'off'
    },
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Next, set the minimum required environment for <a href="https://babeljs.io/" target="_blank">Babel</a>, a JavaScript compiler, <kbd>yarn add -D @babel/core @babel/cli @babel/node @babel/preset-env</kbd>. Having installed the environment, we can create a configuration file <var>babel.config.js</var> and put this code:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  module.exports = {
    presets: [
      [
        '@babel/preset-env',
        { targets: { 'node': '10' }}
      ]
    ]
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Launching the application will be performed by the code in the <var>package.json</var>:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  "scripts": {
    "serve": "babel-node src"
  },
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Now, let's create a <var>src</var> directory with an <var>index.js</var> file inner. This file is the so-called entry point to our application. It's time to install Koa - <kbd>yarn add koa</kbd>. In the <var>index.js</var> - <code>import Koa from 'koa'</code>, and create an instance right away - <code>const app = new Koa()</code>. It's also possible to define common middleware for error handling:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
    }
  })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">There are two points to clarify. Perhaps you are used to working with Express.js, where the handler for errors hangs out at the end of the middleware chain. In Koa.js, the handler is usually located at the beginning of the chain, because unlike Express.js, we can use all the convenience of async functions. If any next method reaches middleware where an error occurs, then it goes back through the chain until it encounters a handler for error. And the other point is related to the fact that we don't pass ctx.body in the error handler. If you build a website in a classic manner, with server-side rendering, using a template engine to share the page to users, then you can read ctx.body, use it in a template. But it doesn't make sense for SPA, since we don't have a single state with the server. When the browser determines the response from the server with a status code that starts at 4 or 5, a throw exception will occur, and ctx.body will be discarded. Koa also allows throwing an exception with a code and a message like this - <code>ctx.throw(ERROR_CODE, ERROR_MESSAGE)</code>. It still is useful while we're working inside Koa. But it also doesn't work for the SPA approach. The message won't be received by the client browser. Determining an error code, the browser will throw an exception with a standard message. For instance, if this fragment of code is run by Koa <code>ctx.throw(400, 'This email is used!')</code>, an object with the status code 400 and the message 'Request failed with status code 400' will be received on the client side. Therefore, the most significant information about an incoming error is its status code.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The next logical step will be to decide where to store the data on the server. There are various options for this. We'll use the <a href="https://www.mongodb.com/" target="_blank">MongoDB</a> database, well-proven as part of the full stack with JavaScript. There're convenient solutions that allow the developer not to keep MongoDB on the local machine. <a href="https://mlab.com/" target="_blank">Mlab</a> is the most famous. But for our manual, I'll use a local database on my computer. If you're also working with the local version of MongoDB, then don't forget to start the mongod client, before starting the server. There's no need to work with MongoDB directly in this project. <a href="https://mongoosejs.com/" target="_blank">Mongoose</a>, a MongoDB object modeling tool, is a standard solution for more convenient work with MongoDB. The terminal - <kbd>yarn add mongoose</kbd>. The <var>index.js</var> - <code>import mongoose from 'mongoose'</code>. Mongoose was designed before Promise became part of the language standard. Subsequently, Promise was implemented in Mongoose, and it is a good practice to indicate which standard Promise is used to develop an application. <code>mongoose.Promise = Promise</code> tells Mongoose that native Promise is being used. It's not necessary to use Promise in your code. It may be more convenient for you to use callback functions. I'm going to show you both options. In the next snippet of code <code>mongoose.connect('mongodb://localhost/db_name')</code> Mongoose connects to MongoDB. The connection will be automatically established on the 27017 default mongod's port. If the database db_name doesn't exist, it'll be automatically created. And { useNewUrlParser: true, useCreateIndex: true } is needed so that mongoose doesn't clutter the console with warnings.</p>
          <h3 id="data-model" :style="{ fontSize: computedStyle.fontSizeH3 }">Data model</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Make a <var>mongoose</var> directory with an <var>index.js</var> and type <code>import mongoose from 'mongoose'</code> at the beginning of the file. Now we can describe model fields:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    passwordSalt: {
      type: String,
      required: true
    },
    cookieSalt: {
      type: String,
      required: true
    }
  })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">All the properties are required. And email is also unique, surely. It also creates an index to optimize the internal search engine in MongoDB. If everything is clear with the email field, the other three properties are not so obvious. Before describing what these fields mean, let's look at the following code snippet:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  userSchema.virtual('password')
    .set(function (password) {
      this.passwordSalt = crypto.randomBytes(32)
      this.cookieSalt = crypto.randomBytes(8)
      this.passwordHash = crypto.pbkdf2Sync(
      password, this.passwordSalt, 2, 32, 'sha256'
      )
    })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Storing user passwords in an unencrypted form in a database or other storage is not just a sign of bad taste, it is an unsafe architectural solution. The essence of the 'virtual' method is to set the 'password' property so that the property itself is not saved in the database. It'll be stored in Mongoose 'RAM', something like that. When the argument 'password' is received inside a virtual property, three already known to us properties are set. To set values for these properties, we use two methods of the internal <a href="https://nodejs.org/api/crypto.html" target="_blank">crypto</a> module from the Node.js core. Don't forget <code>import crypto from 'crypto'</code> above  at the mongoose <var>index.js</var>. The <a href="https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback" target="_blank">randomBytes</a> method generates random data with a specified number of bytes. The <a href="https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest" target="_blank">pbkdf2Sync</a> method encrypts information. We'll use the cookieSalt field, so to speak, in dry form. Having generating this 'salt', we ask Mongoose to save it in the database. In the future, we'll send this value to the client-side and put it in a browser cookie. And when we need user authorization, we will send the 'salt' from the cookie and compare it on the server side with the 'salt' value from the database. Just like that! The passwordSalt serves in a slightly different way. It'll be stored in the database as well. But the essence of this field is exclusively cryptographic. We've already used the passwordSalt to get the passwordHash. And this's what the authentication method looks:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  userSchema.methods.checkPassword = function (password) {
    return crypto.pbkdf2Sync(
      password, this.passwordSalt, 2, 32, 'sha256'
    ) == this.passwordHash
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }"> The only difference is that the first time we use 'salt' when the user registers, and in the second case, for the login. Both times we substitute the password and 'salt' into the pbkdf2Sync method, which, with the same arguments, always returns the same value.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Finally, we can export the User model at the end of the mongoose <var>index.js</var> script like this - <code>export default mongoose.model('User', userSchema)</code>.</p>
          <h3 id="passport" :style="{ fontSize: computedStyle.fontSizeH3 }">Passport.js</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Install these modules - <kbd>yarn add koa-passport passport-local passport-jwt</kbd>.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Passport is authentication middleware for Node.js. Extremely flexible and modular... so say the creators of this module on the official <a href="http://www.passportjs.org/" target="_blank">website</a>. And it's hard to disagree with them! Using this middleware is fun. Although at the beginning it may seem a bit unclear, since strategies hide the details of the authentication process, and that brings in a bit of magic. In addition, it may seem that the use of this module is redundant as a whole. And this makes sense! You can do without this module by reducing the amount of code and removing an abstraction layer, which Passport implements. But when you need to add authentication to an application using Facebook, or Twitter, or Google, or Instagram... or one of 500+ available strategies in Passport, you'll really appreciate the flexibility of this module. Ok, after all these laudatory speeches about this middleware, let's start working with it. For the first, add <code>import passport from 'koa-passport'</code> and <code>app.use(passport.initialize())</code> in the main <var>index.js</var>. Further, create a <var>passport</var> folder with an <var>index.js</var> inside and import Passport at the beginning of the file - <code>import passport from 'passport'</code>.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The <a href="http://www.passportjs.org/packages/passport-local/" target="_blank">local strategy</a> is used to authenticate a user by entering a name and password. Let's set it up - <code>import LocalStrategy from 'passport-local'</code>. The User model is needed as well - <code>import User from '../mongoose'</code>. And this is the strategy itself:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(
            null,
            false,
            { message: 'User doesn\'t exist' }
          )
        }

        if (!user.checkPassword(password)) {
          return done(
            null,
            false,
            { message: 'Password is incorrect' }
          )
        }

        return done(null, user)
      }, err => done(err))
  }))
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">As I promised at the beginning of the article, I'm going to show you how it would look like a regular callback function:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(
          null,
          false,
          { message: 'User doesn\'t exist' }
        )
      }

      if (!user.checkPassword(password)) {
        return done(
          null,
          false,
          { message: 'Password is incorrect' }
        )
      }

      return done(null, user)
    })
  })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">By default, the localStrategy expects to receive an object in the request body with the fields 'username' and 'password', which will be automatically retrieved by the strategy itself. Since we use the email field for authentication, we indicate in the parameters object that the strategy should accept the 'email' field instead of the 'user name'. The second parameter is the handler for the strategy, where we send the two 'email' and 'password' fields already described, and the third parameter is the callback. Then the simple logic, searching a user in MongoDB is executed by the field 'email'. And if the user is found, the 'checkPassword' method, which is already familiar to us, is used. Interestingly, the localStrategy allows passing a message as the third parameter to the callback, which will go to the client-side by 'info' object with ctx.body. Do you remember, I said that we can't get an error message on the client side? But the third parameter of callback allows us to correctly handle various cases and send a message on the client in the response body. Moreover, such cases as a mismatch of passwords, not finding a user in the database, it's wrong to consider as errors as a whole. Let's now take a look at the second necessary strategy:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  passport.use(new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret key'
  },
  (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      }, err => done(err))
  }))
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Or without promise:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  (payload, done) => {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }

      if (user) {
        done(null, user)
      } else {
      done(null, false)
      }
    })
  })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Similarly, as in the Local Strategy, the <a href="http://www.passportjs.org/packages/passport-jwt/" target="_blank">JWT Strategy</a> takes as its first argument the object with options. The first key indicates the method to retrieve the token, and the second secret key to sign the token. The secret phrase is usually put into a configuration file in production. After receiving the token, the strategy automatically decrypts it and provides the decrypted data in the form of the 'payload' argument. It's time to go to the last significant module of the server application, where we're going to create the token and more.</p>
          <h3 id="router" :style="{ fontSize: computedStyle.fontSizeH3 }">Router.js</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Now having built the User model and the Passport layer, we're going to consider how to organize the connection between the server side and the client side through REST API. To adjust routes, we have to install Router for Koa. If you're used to working with Express.js, don't be surprised - Koa is so minimal that even the router isn't included. This's certainly a funny fact. For installation in the terminal - <kbd>yarn add koa-router</kbd> - and make a <var>router</var> directory with an <var>index.js</var>. Also, a special module will be used to create the jwt token, install it with <kbd>yarn add jsonwebtoken</kbd>. Import the necessary modules in <var>index.js</var>:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import Router from 'koa-router'
  import passport from 'passport'
  import jsonwebtoken from 'jsonwebtoken'
  import passportStrategies from '../passport'
  import User from '../mongoose'
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Our pre-configured strategy module is imported under the name 'passportStrategies' because the Passport module under the name 'passport' is imported before it. Although it's obvious. <code>const router = new Router()</code> creates an instance of Router. To implement 'reinforced' authentication, we're going to create three post routes: login, registration, guard.</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  router.post('/login', async ctx => {
    await passport.authenticate(
      'local',
      (err, user, info, status) => {
        if (err) {
          ctx.throw(err.status)
        } else if (!user) {
          ctx.body = { info }
        } else {
          const payload = {
            id: user.id
          }

          const token = jsonwebtoken.sign(
            payload,
            'secret key'
          )

          ctx.body = {
            token: token,
            email: user.email,
            defense: user.cookieSalt
          }
        }
      }
    )(ctx)
  })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">When a post method request arrives at the address '/login' from the client browser, the Local Strategy is activated in the handler, and we can get the 'done' callback result from the configured in the <var>../passport/index.js</var>. This may seem a little magical, as mentioned before. Processing the result should already be clear, as it was dealt with in the previous step. Do you remember, I mentioned about the 'info' object? It should be also separately noted what happens in the else block, where the response is formed to the client with the jwt token. In the body of the jwt token, we can encrypt any useful information. You can read more <a href="https://en.wikipedia.org/wiki/JSON_Web_Token" target="_blank">here</a>. When creating a user object in the database, MongoDB automatically assigns a unique index to each object. If the callback 'done' receives the user object and the password passes the check, then the user id will be encrypted in the jwt token, which will be sent to the client browser. The next route is '/registration':</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  router.post('/registration', async ctx => {
    try {
      await User.create(ctx.request.body)

      await passport.authenticate(
        'local',
        (err, user, info, status) => {
          if (err) {
            ctx.throw(err.status)
          } else if (!user) {
            ctx.body = { info }
          } else {
            const payload = {
              id: user.id
            }

            const token = jsonwebtoken.sign(
              payload,
              'secret key'
            )

            ctx.body = {
              token: token,
              email: user.email,
              defense: user.cookieSalt
            }
          }
        }
      )(ctx)
    } catch (err) {
      if (err.name == 'MongoError' && err.code == 11000) {
        ctx.body = {
          info: { message: 'This email is already used' }
        }
        return
      }

      ctx.throw(err.status)
    }
  })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The handler initializes the creation of a user in the database. The Local Strategy is immediately launched to authenticate the user. If a user with the same name is already registered, MongoDB will return a unique error with the name MongoError and the code 11000. It will be intercepted in the 'catch' block and the 'info' object will be created. This object has the same structure as that returned by the 'done' callback if necessary. This contributes to the convenience of processing the response on the client side. As I said, the error of uniqueness shouldn't be regarded as an error in the usual sense, for example, the lack of an Internet connection, or any system error.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And the last not covered route is '/guard':</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  router.post('/guard', async (ctx) => {
    await passport.authenticate('jwt', (err, user) => {
      if (user) {
        if (user.cookieSalt == ctx.request.body.defense) {
          ctx.body = user.email
        } else {
          ctx.body = {
            info: { message: 'Something wrong with cookies' }
          }
        }
      } else if (!user) {
        ctx.body = { info: { message: 'Please, log in!' }}
      } else if (err) {
        ctx.status = err.status
      }
    })(ctx)
  })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And again, when authenticating via the Local Strategy, the jwt token with the encrypted user id in the body will be sent and stored in the client browser. When you need to verify user authentication for a protected resource, the client will send a post request to '/ guard', where the JWT Strategy will be enabled. The token will be extracted from the authentication header and decrypted by the strategy. <code>User.findById(payload.id)</code> will search for a user object in the database using the decrypted key 'id' of the 'payload' object. The client in the request body will also have to send the cookieSalt, which was sent during the Local Strategy authentication <code>defense: user.cookieSalt</code>. We already talked about this. If the user is found, the cookieSalt received from the client’s side will be compared with the one stored in the database. The client email will be sent as a response from the server.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Now export the routes - <code>export default router.routes()</code> - and import in the main <var>index.js</var> - <code>import router from './router'</code>. And initialize the routes after the error handler - <code>app.use(router)</code>.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Almost all work with the server part has been done. There're a few actions left. First, you need to install pair lacking modules for proper operation. <kbd>yarn add @koa/cors</kbd> for <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank">Cross-Origin Resource Sharing</a> and <kbd>yarn add koa-bodyparser</kbd> to parse the client response body. At the beginning of the main <var>index.js</var> file, insert this code: <code>import bodyparser from 'koa-bodyparser'</code>, <code>import cors from '@koa/cors'</code>. And initialize the modules: <code>app.use(bodyparser())</code>, <code>app.use(cors())</code>. Finally, for starting the server, put the code - <code>app.listen(3000)</code> - at the end of the file. The port in the parentheses on which the application is launched can be taken out to a configuration file.</p>
          <h2 :style="{ fontSize: computedStyle.fontSizeH2 }">Client-side</h2>
          <h3 id="env-client" :style="{ fontSize: computedStyle.fontSizeH3 }">Setting up the environment</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">To facilitate the task of deploying a vue.js application, we will use the <a href="https://cli.vuejs.org/guide/#components-of-the-system" target="_blank">official CLI</a>. Type in the terminal - <kbd>yarn add -g @vue/cli</kbd>. The -g flag allows installing the module globally, with access to it from any directory of your operating system. Further, create a scaffolding for application from the project directory: <kbd>Vue create vue-part</kbd>. Then the CLI should ask a series of questions. I'm going to show my choices:</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"><kbd>Please pick a preset:</kbd> <em>Manually select features</em></p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"><kbd>Check the features needed for your project:</kbd> <em>Babel, Router, Vuex, Linter / Formatter</em></p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"><kbd>Use history mode for router?</kbd> <em>Y</em></p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"><kbd>Pick a linter / formatter config:</kbd> <em>ESLint + Standard config</em></p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"><kbd>Pick additional lint features</kbd> <em>null</em></p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"><kbd>Where do you prefer placing config for Babel, PostCSS, ESLint, etc.?</kbd> <em>In dedicated config files</em></p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"><kbd>Save this as a preset for future projects?</kbd> <em>N</em></p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">In addition, if you are running the CLI for the first time after installing Yarn, you'll be asked at the last step which package manager will be used. I use Yarn. In the future, this question will be ignored by the Vue CLI, and the manager will be used which you have chosen.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">After the CLI has successfully created the application, you should see the following output in the terminal: <kbd>$ cd vue-part</kbd> and <kbd>$ yarn serve</kbd>. You can execute the proposed commands to make sure that the project is working.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Now let's see what we have in the newly created project. You can boldly delete the <var>views</var> folder, we will manage the <var>components</var> directory. Also, clear the <var>components</var> from the <var>HelloWorld.vue</var> component. You can create the <var>router</var> and <var>store</var> directories, move the <var>router.js</var> and <var>store.js</var> files there, and rename the files to <var>index.js</var>. This will create quite a handy structure of modules, especially considering that they can grow with related files. Delete <code>import Home from './views/Home.vue'</code> and clear the routes array. There's one more thing that we need to figure out before moving on to developing components. Since we intend to use both local storage and cookies for authentication, we're going to use them on the client side. Working with local storage with a native API is convenient. But working with the cookies API is not quite convenient. To solve this problem, we will use a third-party solution. Type <kbd>yarn add vue-cookie</kbd> in the terminal and <code>import Cookie from 'vue-cookie'</code>, <code>Vue.use(Cookie)</code> in the <var>main.js</var>.</p>
          <h3 id="auth-component" :style="{ fontSize: computedStyle.fontSizeH3 }">Auth component</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The App component in the src root folder is the entry point for all other components. Let's start by organizing the code in it. But first, I would like to remind once again that the principles of Vue.js working won't be described here. If you don't understand what is happening with the code, you'll most likely have to refer to the excellent <a href="https://vuejs.org/" target="_blank">Vue.js documentation</a>. I won't mention about CSS styles in 'style' blocks as well. You'll probably want to customize designing the application in your own way. Let's get started!</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">First, we need to decide how our application should look visually. Let our toolbar consists of three items, each will lead to its own route. It might look something like this:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  &lt;div&gt;
    &lt;router-link to="/"&gt;
      &lt;span&gt;Home&lt;/span&gt;
    &lt;/router-link&gt;

    &lt;router-link to="/protected"&gt;
      &lt;span id="protected"&gt;Protected resource&lt;/span&gt;
    &lt;/router-link&gt;

    &lt;router-link to="/auth"&gt;
      &lt;span&gt;Auth&lt;/span&gt;
    &lt;/router-link&gt;
  &lt;/div&gt;

  &lt;router-view/&gt;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">When clicking on 'Home', we can always return to the home page of the site. Clicking on 'Protected resource' or 'Auth' will tell the application to bring a corresponding component to &lt;router-view/&gt;. We'll return to the <var>App.vue</var>, but for now let's do the following step. Create an <var>Auth.vue</var> file in the <var>components</var> folder. Obviously, we need two windows: for login, for registration. And although it would be possible to implement all the logic in one component, but we won't do that. This is not consistent with the principles of component development. So create an <var>auth</var> directory next to the <var>Auth.vue</var>, and place in it two components: <var>Login.vue</var> and <var>Registration.vue</var>.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Let's look at the component for login. Its template represents a form with expected 'email' and 'password' fields, as well as a button to send data to the server.</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  &lt;form&gt;
    &lt;p&gt;&lt;b&gt;email:&lt;/b&gt;&lt;br&gt;
      &lt;input
        name="email"
        type="email"
        maxlength="30"
        v-model="email"
      &gt;
    &lt;/p&gt;

    &lt;p&gt;&lt;b&gt;password:&lt;/b&gt;&lt;br&gt;
      &lt;input
        name="password"
        type="password"
        maxlength="40"
        v-model="password"
      &gt;
    &lt;/p&gt;

    &lt;button
      type="button"
      @click="onSubmit"
    &gt;OK&lt;/button&gt;
  &lt;/form&gt;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Create bind fields:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  data () {
    return {
      email: null,
      password: null
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And here is a method for sending data:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  onSubmit () {
    if (!this.email || !this.password) {
      alert('Fill all the fields, please!')
      return
    }

    const user = {
      email: this.email,
      password: this.password
    }

    this.$store.dispatch('login', user)
      .then(() => {
        if (this.$store.getters.isLoggedIn) {
          this.$router.push('/')
        }
      })
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">I want to note that our method doesn't produce full validation. There're third-party solutions to make the creation of validation for a developer comfortable. I usually prefer using <a href="https://vuelidate.netlify.com/" target="_blank">Vuelidate</a>. In the 'onSubmit' method, an object is formed for transmission with the fields we need. Next, this object is passed to the Store instance 'login' method. After that, we're focusing on the value of the getter, which indicates whether the user is currently logged in. And finally, if the authentication process is successful, the code <code>this.$router.push('/')</code> will send the user to the home page. We're not going to consider now the properties of the Store instance, leaving it for the next section of the manual. That breaks the linearity of the narration, but helps with structure though.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">As for the 'Registration.vue' component, it's very similar to 'Login.vue'. The differences are minor. We can add an additional field to check the password for typos:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  &lt;p&gt;&lt;b&gt;repeat password:&lt;/b&gt;&lt;br&gt;
    &lt;input
      name="repeat-password"
      type="password"
      maxlength="40"
      v-model="repeatPassword"
    &gt;
  &lt;/p&gt;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Don't forget to add a <code>repeatPassword: null</code> property in the 'data' of the component instance. And add additional checks related to the new field:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  if (!this.email || !this.password || !this.repeatPassword) {
    alert('Fill all the fields, please')
    return
  }

  if (this.password != this.repeatPassword) {
    alert('passwords don\'t match')
    return
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And instead of the 'login' method, we'll call a 'registration' method in the Store actions.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Having ready two necessary components, for login and registration, we can connect them in the <var>Auth.vue</var> component. Since we would like to render one of the subcomponents inside the 'Auth' component, we should make a switcher:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  data () {
    return {
      form: null
    }
  },
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The 'form' key will signal which component should be displayed to the user. By the way, let's not forget to import the subcomponents: <code>import Login from './auth/Login'</code>, <code>import Registration from './auth/Registration'</code>, <code>components: { Login, Registration }</code>. Go to the template:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  &lt;div id="forms"&gt;
    &lt;div&gt;
      &lt;div @click="login"&gt;Log in&lt;/div&gt;
      &lt;div @click="registration"&gt;Registration&lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="form"&gt;
      &lt;Login v-if="form == 'login'"&gt;&lt;/Login&gt;
      &lt;Registration v-if="form == 'registration'"&gt;&lt;/Registration&gt;
    &lt;/div&gt;
  &lt;/div&gt;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }"> And two methods:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  login () {
    this.form = 'login'
  },
  registration () {
    this.form = 'registration'
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Well, the code hardly requires an explanation, the logic is extremely simple: when clicking on one of the navigation divs, we tell the code through the desired method what value to assign to the 'form' field. In turn, in the div with the class 'form,' the necessary component is rendered according to the condition. We're going to optimize the code by transferring logic to computed properties:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  &lt;Login v-if="isLoginVisible"&gt;&lt;/Login&gt;
  &lt;Registration v-if="isRegistrationVisible"&gt;&lt;/Registration&gt;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And methods:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  computed: {
    isLoginVisible () {
      return this.form == 'login'
    },
    isRegistrationVisible () {
      return this.form == 'registration'
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Also, you can find in the source code moments associated with the styles <code>class="menu" :class="{ active: isLoginVisible }"</code> and another similar <code>class="menu" :class="{ active: isRegistrationVisible }"</code>. As I mentioned earlier, there won't be described the work with styles, but I want nevertheless to clarify that this code is needed in order to apply the necessary formatting for the component currently involved.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">It remains a case for small, to include our newly-made component in the application router. In the <var>index.js</var> file of the router: <code>import Auth from '../components/Auth'</code>,</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  {
    path: '/auth',
    component: Auth
  }
          </code>
          <h3 id="vuex" :style="{ fontSize: computedStyle.fontSizeH3 }">Vuex</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">It's time to deal with the state of our application. We already have triggers to get started with the Store. The speech of course about the 'onSubmit' method in which we addressed the Store with the condition <code>this.$store.getters.isLoggedIn</code>. Let's immediately implement it and I'm going to build on it in app logic. In the <var>index.js</var> of the <var>store</var> type this code:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  getters: {
    isLoggedIn (state) {
      return state.isLoggedIn
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">We also already addressed the 'login' and 'registration' actions from our 'onSubmit' methods. These methods are naturally very powerful, they bind the server and client parts. Consequently, we'll contact the server in them. And for this we'll use a convenient third-party solution <a href="https://github.com/axios/axios" target="_blank">Axios</a>. Our standard installation procedure - <kbd>yarn add axios</kbd>, in the Store <var>index.js</var> - <code>import axios from 'axios'</code>. And so as not to specify an address in each request <code>axios.defaults.baseURL = 'http://localhost:3000'</code>.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Let's start the implementation of the 'login' method in the actions section. We know that it gets the user object as an argument. So it might look something like this:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  async login ({ commit }, { email, password }) {

  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">In the body of the function, we're going to make a post request to our server, also wrap it in the try-catch block to handle the error of unavailability of the connection to the server. This may be an absence of the internet connection, or the server is not working.</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  try {
    const user = await axios.post('/login', { email, password })
  } catch (err) {
    alert('There\'s something wrong with the connect')
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The username and password values entered by a client in the form will be sent to the server. The local strategy will be called in the handler of the route. Inside, the strategy expects to receive an object with the keys that we specified: usernameField: 'email', passwordField: 'password'. The virtual method 'password' will receive the expected key 'password' and assign the remaining fields, in accordance with the logic that we've written.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Well, then the server will have to return the user object to us. Perhaps it will contain the 'info' key, but if all passes off smoothly, then data required for authentication will be returned. Let's process it:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  if (user.data.info) {
    alert(user.data.info.message)
    return
  }

  const token = user.data.token
  const userEmail = user.data.email
  const defense = user.data.defense

  commit('setLogin', { token, email: userEmail, defense })

  return defense
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Nothing special happens in the code. If the authentication fails, we will simply notify the user about the nuances through the message from the 'info' object. Next, we scatter the data on the variables. The field 'email' is already taken in our method. In fact, we could redefine it by writing 'email = user.data.email' like this. But it'll break the structure. The structure is more important than aesthetics. And we would still lose the 'const' declaration, without that the code would look awkward anyway. Next, the 'commit' is used to call the mutation 'setLogin' that we have not yet created, which will assign the required fields to the 'state'. Although this refers to the work of Vue.js itself, I remind you that you shouldn't assign fields to the state directly. Do this through mutations. Well, in the end, the 'login' method will return the 'defense' value, which is assigned to the cookie in the 'onSubmit' method. So, now we can arrange the 'state' and the 'setLogin' method in the 'mutations':</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  state: {
    token: null,
    email: null,
    defense: null
  },
  mutations: {
    setLogin (state, { token, email, defense }) {
      state.token = token
      state.email = email
      state.defense = defense
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Previously, we used the value 'state.isLoggedIn' in the 'getters'. In fact, it was a stub for a while. In order for the logic to work, let's estimate from which values this getter-property should depend. In fact, you can select all three fields for the 'isLoggedIn' support. I will use the 'token' and 'defense' values:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  isLoggedIn (state) {
    return (!!state.token && !!state.defense)
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And again, although this moment is associated with understanding JavaScript, I think I should clarify it. It may not be obvious why we use double negation !!. This is a standard technique for casting types in JavaScript. Take a look, for instance, we have values in the token and protection. Their type is string, of course. What does this code segment return (state.token && state.defense)? Actually, the value of the state.defense. But we need to get a yes or no answer. Has the user been authenticated, this is what interests us. And of course, the boolean type is what we need. Therefore, if the state.token and state.defense contain strings, as it should be if the user logged in, they will be inverted into (true, true) and the 'true' will be returned.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Cool! But there's something to think about. Suppose the user has entered his confidential data. And here he is authenticated. But what will happen if the user leaves the site and returns later, or simply reloads the page? The Store will update the state. It would be ridiculous to ask an audience of our application to enter data after each page refresh. Well, as stated in the 'Preparation' section, we're going to store the data in two repositories available to the browser - localStorage and cookie. We'll keep the 'defense' in cookies, this was predetermined by the logic that we organized on the server. Do you remember, we passed the value of 'user.cookieSalt' to the key 'defense'? Okay, import the Cookie instance - <kbd>import Cookie from 'vue-cookie'</kbd>. Now adjust the behavior of the 'state' and 'setLogin':</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  state: {
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    defense: Cookie.get('defense') || null
  },
  mutations: {
    setLogin (state, { token, email, defense }) {
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      Cookie.set('defense', defense, { expires: '1Y' })

      state.token = token
      state.email = email
      state.defense = defense
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Following method in the 'actions' is the 'registration'. I'm not going to give full code of this method, cause it completely coincides with that of the 'login', and the article quietly turns into a book :)  Differences only in the name of the methods and requests:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  async registration ({ commit }, { email, password }) {
    try {
      const user = await axios.post('/registration', { email, password })
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Also, note that the same code could be made into a separate function. This would change the name of the variable 'userEmail' to 'email' if you have a desire for perfectionism. But you will have to move the function outside the Store. I think it's not worth it. Moreover, you probably will not need to implement another method with similar logic.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">We have a ready-made functionality to produce a user login, but so far nothing visually signals this. Of course we need to fix it. But before that, we should implement another action method that asks for our app realization. That's about a 'logout' method. It has opposite logic for 'login'. So create a mutation for this:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  setLogout (state) {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    Cookie.delete('defense')

    state.token = null
    state.email = null
    state.defense = null
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And so an action for this may look like:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  logout ({ commit }) {
    commit('setLogout')
  }
          </code>
          <h3 id="auth-state" :style="{ fontSize: computedStyle.fontSizeH3 }">Auth state visualization</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">We have the 'Auth' button in the 'App.vue' markup, that leads the browser to render the component of the same name, when we click it. We need another button that will allow the user to log out. Finally, let's make a condition for the buttons under which only one button will be visible at any given time. All together it looks like this:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  &lt;router-link to="/auth" v-if="!isLoggedIn"&gt;
    &lt;span&gt;Auth&lt;/span&gt;
  &lt;/router-link>

  &lt;span v-if="isLoggedIn" @click="logout"&gt;Out&lt;/span&gt;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And JavaScript:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')

      this.$router.push('/')
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">As you can see, we haven't come up with anything new. We have already done something similar for rendering the subcomponents in the 'Auth.vue'. <code>this.$router.push('/')</code> for redirecting. This's wrong if the user remains on a protected page when he no longer has rights to it.</p>
          <h3 id="the-final" :style="{ fontSize: computedStyle.fontSizeH3 }">The final</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">If you have thought that our authentication system is ready already - it is not. But not much is left! What will happen if we rely on the 'isLoggedIn' value from the getters to provide access to the user to a protected resource? It will be strange because our authentication system is very lame. In order for the user to be considered logged in, it is enough to enter any values with the correct keys in the localStorage and cookie. Very lame. Anyway, the correct architecture makes us contact the server to compare the data received from the client. Actually, it was for this that we needed the JWT Strategy.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Well, if the saying goes, all roads lead to Rome, then us they lead to the Store:) Return to the Store to implement our latest method in the actions. Well, I'am going to show all code at once:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  async guard (context, defenseFromCookie) {
    try {
      const guard = await axios.post(
        '/guard',
        { defense: Cookie.get('defense') },
        { headers:
          { Authorization: 'Bearer ' +
            localStorage.getItem('token') }
        }
      )

      if (guard.data == this.state.email) {
        return true
      }

      if (guard.data.info) {
        alert(guard.data.info.message)
      }

      return false
    } catch (err) {
      alert('There\'s something wrong with the connect')
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">We send post request '/ guard', we pass the necessary argument defense. Note that we take the value directly from the browser cookie. Do you remember, when we configured the JWT Strategy, we assigned where to look for the token <code>jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),</code>? Good! That's what we're doing here:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  { headers:
    { Authorization: 'Bearer ' +
      localStorage.getItem('token') }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Axios allows setting the headers in the options object. And again we specify to take the value of localStorage directly from the browser. Very elegant! The server will use the JWT Strategy, which automatically decrypts the token and extracts the value from the payload. Then make a search in MongoDB for the extracted id. If the user is found, he will be transferred to the router. If the code <code>user.cookieSalt == ctx.request.body.defense</code> runs and returns true, then we'll get the user email address due <code>ctx.body = user.email</code>. Well, for greater certainty, we compare the received email with that in the Store and return 'true' if all ok. Else - 'false'.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }"> Hold on, there is really a bit left. Let's simulate a protected resource. Create the 'Protected.vue' component in the <var>components</var>. You can create any markup for it. I put in <code>&lt;h1&gt;This is a very protected resource!&lt;/h1&gt;</code>. Now create a route for it. <code>import Store from '../store'</code>, <code>import Protected from '../components/Protected'</code>, inside <var>index.js</var> of the <var>router</var>. The route:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  {
    path: '/protected',
    component: Protected,
    beforeEnter: (to, from, next) => {
      Store.dispatch('guard')
        .then(guard => {
          if (guard) next()
          next(false)
        })
        .catch()
    }
  }
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">We use the help of <a href="https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards" target="_blank">Navigation Guard</a>. That's all! 'Reinforced' authentication has been completed. Good luck to you and let an audience of your site be under reliable protection! And put a star on GitHub, if the manual was useful.</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'KoaVueAuthentication',
  props: [ 'computedStyle' ],
  data () {
    return {

    }
  }
}
</script>
