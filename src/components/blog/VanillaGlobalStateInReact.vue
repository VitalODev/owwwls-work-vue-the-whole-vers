<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm11 md10 xl8>
        <div class="div-spacer">
          <h1 :style="{ fontSize: computedStyle.fontSizeH1 }">React vanilla (without Redux) global state on hooks</h1>

          <div class="text-xs-left pl-3 pb-3">
            <a href="https://github.com/VitalODev/vanilla-global-state-in-react-on-hooks" target="_blank" style="text-decoration: none">
              <v-btn dark>
                source code
                <v-icon right class="pr-2">build</v-icon>
              </v-btn>
            </a>
          </div>

          <v-breadcrumbs>
            <v-breadcrumbs-item disabled>Prerequisites</v-breadcrumbs-item>
          </v-breadcrumbs>

          <v-breadcrumbs divider="-">
            <v-breadcrumbs-item disabled>An application</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#skeleton', { duration: 1000 })">A skeleton</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#state', { duration: 2000 })">State</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#christmas-tree-provider', { duration: 2100 })">Christmas tree provider</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#scope-value-provider', { duration: 2200 })">Scope value provider</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#about-improvement', { duration: 2200 })">About improvement</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#consumption-stage', { duration: 2200 })">Consumption stage</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#work-capacity-checking', { duration: 2200 })">Work capacity checking</v-breadcrumbs-item>
          </v-breadcrumbs>

          <v-breadcrumbs divider="-">
            <v-breadcrumbs-item disabled>Conclusion</v-breadcrumbs-item>
            <v-breadcrumbs-item @click="$vuetify.goTo('#redux-comparison', { duration: 2500 })">Comparison with Redux</v-breadcrumbs-item>
          </v-breadcrumbs>

          <h2 :style="{ fontSize: computedStyle.fontSizeH2 }">Prerequisites</h2>
          <p :style="{ fontSize: computedStyle.fontSizeP }">I came to React, being a Vue developer. I was impressed with this “smart” library of view... but then I met Redux. After Vuex, this way of managing the state of the application seemed a bit ugly and cumbersome to me. I remember the idea was spinning in my head: "React teaches you javascript, Vue - how to create applications." And there is nothing strange in it because React is a library, Vue is a framework. React focused on a component approach to development, Vue oriented on data dynamics (this is how I see them). But today we are not talking about the difference between these wonderful technologies. Let's go back to Redux. Although let me reformulate the proposal - let's no longer go back to Redux:) When I learned the hooks, it allowed me to no longer go back to Redux and MobX... at least in my own projects. I am very pleased because I believe that managing the global state is the task of a view library, and not of a third-party solution. Also, I want to note it is assumed that you are familiar with hooks. If not, here is <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank" style="text-decoration: none">the link</a> to the official documentation.</p>
          <h2 :style="{ fontSize: computedStyle.fontSizeH2 }">An application</h2>
          <h3 id="skeleton" :style="{ fontSize: computedStyle.fontSizeH3 }">A skeleton</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">I'm going to create a very simple application with a minimum of components, but enough to show how we can achieve the native global state in React applications. So, let's go ahead.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">At the top level, our application is represented by an App component with two components inside: Date and ManualDateInitializer. The Date is used to display three separate components: Day, Month, Year. Of course, the example is not very practical - in practice, we would most likely have one strong component of the date with all three fields inside. But great for educational purposes though. Because now we will have several (three) providers to merge into one main. Perhaps providing information on how to link providers is the main value of this article, because on other aspects there is enough information on the web. Well, what about the second component? We need the ManualDateInitializer solely as a test to make sure that our global state works. Let's look at the Day component code (the Month and Year have exactly the same code with the difference in namespaces):</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import React from 'react';

  const Day = () => &lt;span&gt;Here should be a DAY value&lt;/span&gt;;

  export default Day;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Simple "stupid" component for day value representation. We will return to the ManualDateInitializer code closer to completing the guide.</p>
          <h3 id="state" :style="{ fontSize: computedStyle.fontSizeH3 }">State</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The vanilla global state logic is approximately equivalent to the behavior of those in Redux (because Redux uses the same tricks inside). It doesn't matter if you are familiar with Redux or not. But, if you are, you can also distribute reducers, action types, contexts, providers by files, as far as you are used to doing it. I prefer to see the whole mechanism as one sturdy module. Let's take a look at the module code:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import React, { createContext, useReducer } from 'react';

  const initialDay = { day: '' };

  const dayReducer = (state = initialDay, action) => {

    switch (action.type) {

      case 'SET_DAY':
        return { day: action.payload };

      default:
        return state;
    }
  };

  const dayContext = createContext();

  const DayProvider = (props) => {

    const [ dayState, dayDispatch ] = useReducer(dayReducer, initialDay);

    return (
      &lt;dayContext.Provider value={{ dayContextProviderValue }}&gt;
        { props.children }
      &lt;/dayContext.Provider&gt;
    );
  };

  export { DayProvider, dayContext };
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The main task of this module is to provide two entities: the DayProvider and the dayContext. Through the DayProvider we can transfer the necessary data to the child components. And the data is not automatically transmitted to each descendant, as in the prop drilling concept, but retrieved using the dayContext. If it sounds not clear, I recommend you read the official documentation <a href="https://reactjs.org/docs/context.html" target="_blank" style="text-decoration: none">here</a>.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">And again, due to createContext, we create the context object in one line <code>const dayContext = createContext();</code>. Next, we use its Provider component inside the DayProvider to transfer data to descendants. We also export this object to further import inside the children and access data from the Provider component.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">The second aspect that the module implements is the data itself, which we are going to access. It is implemented by a more advanced version of useState hook - useReducer. If you do not understand what is happening inside the dayReducer function, maybe <a href="https://www.robinwieruch.de/javascript-reducer/" target="_blank" style="text-decoration: none">this article</a> will help you.</p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Finally, the useReducer hook allows us to obtain the desired state of the data and the method of managing it (dispatch). We pass them inside through the value attribute of the provider. Modules for the month and year are absolutely similar - the difference only in the namespaces.</p>
          <h3 id="christmas-tree-provider" :style="{ fontSize: computedStyle.fontSizeH3 }">Christmas tree provider</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">Well, now we have three data providers and it's time to connect them to our application. The code for it:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import React from 'react';

  import { DayProvider } from '../store/day';
  import { MonthProvider } from '../store/month';
  import { YearProvider } from '../store/year';

  import Date from './date';
  import ManualDateInitializer from './manual-date-initializer';

  const App = () => (
    &lt;DayProvider&gt;
      &lt;MonthProvider&gt;
        &lt;YearProvider&gt;
          &lt;Date /&gt;
          &lt;ManualDateInitializer /&gt;
        &lt;/YearProvider&gt;
      &lt;/MonthProvider&gt;
    &lt;/DayProvider&gt;
  );

  export default App;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">By wrapping Date and ManualDateInitializer into our providers, we can now get the day, month, year values in these components (and the corresponding dispatchers). But what the heck is with our code? Obviously, with the growing number of providers, our application will be polluted. Although it is already:) I wish it looked like this:</p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import StateProvider from '../store';

  const App = () => (
    &lt;StateProvider&gt;
      &lt;Date /&gt;
      &lt;ManualDateInitializer /&gt;
    &lt;/StateProvider&gt;
  );
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Let's unify providers into one general:
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import React from 'react';

  import { DayProvider } from './day';
  import { MonthProvider } from './month';
  import { YearProvider } from './year';

  const providers = [ DayProvider, MonthProvider, YearProvider ];

  const StateProvider = providers.reduce(
    (Previous, Next) => {
      return (props) => {
        return &lt;Previous&gt;&lt;Next&gt;{ props.children }&lt;/Next&gt;&lt;/Previous&gt;;
      };
    }
  );

  export default StateProvider;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Now all providers are isolated in the single component, it conceptually looks better.
          </p>
          <h3 id="scope-value-provider" :style="{ fontSize: computedStyle.fontSizeH3 }">Scope value provider</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Nevertheless, our common provider has one unpleasant aesthetic drawback. If you are used to using the Elements tab in devTools to analyze the application, then you will not see any providers. They do not have a shell in the form of an HTML-element. But, if you use React devTools, then in front of you will appear a little forest from these components. We have only three of them, but imagine that there would be 10, 20, 30... We can implement a common provider without such a flaw. We need to slightly change the providers' files. And this is how it looks:
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  const initialDay = { day: '' };

  const dayReducer = (state = initialDay, action) => {

    switch(action.type) {

      case 'day':
        return { day: action.payload };

      default:
        return state;
    }
  };

  export { dayReducer, initialDay };
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            The module has thinned considerably. We've got rid of imports, context, and provider component. Now, this entity is no longer correctly regarded as a provider, it is a reducer. The rest of the logic is going to be transferred to the StateProvider:
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
import React, { useReducer, createContext } from 'react';

import {
  dayReducer, initialDay,
  monthReducer, initialMonth,
  yearReducer, initialYear } from './reducers';

const globalStateContext = createContext();
const Provider = globalStateContext.Provider;

const StateProvider = (props) => {

  const [ dayState, dayDispatch ] = useReducer(dayReducer, initialDay);
  const [ monthState, monthDispatch ] = useReducer(monthReducer, initialMonth);
  const [ yearState, yearDispatch ] = useReducer(yearReducer, initialYear);

  const providersScope = {
    dayState, dayDispatch,
    monthState, monthDispatch,
    yearState, yearDispatch
  };

  return &lt;Provider value={providersScope}&gt;{ props.children }&lt;/Provider&gt;;
};

export { StateProvider, globalStateContext };
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            The code has bloated, and this is not strange, because we've moved here a significant part of the initialization data of providers. In general, the code is already familiar to us, we just restructured it a little.
          </p>
          <h3 id="about-improvement" :style="{ fontSize: computedStyle.fontSizeH3 }">About improvement</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            This section contains some of my reasoning. If you don't understand anything - not a loss.
          </p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            The StateProvider has pretty much conceptually evolved. That's cool, but the question that I'm used to asking myself is "can it be better?". And the answer to it is "of course!". There are probably many options for improving this component. But what I would specifically like is to automate the process of adding our states and dispatchers to the providerScope array. We are just writing a reducer (reducers will have to be written anyway:)), and the rest is done by the automation script. In JavaScript there is no mechanism for self-initialization of modules (as in most other programming languages actually), the module is initialized at the time of import. So, we need to programmatically extract a list of all reducers from the directory and initialize them in a script. We could do this in server Node through the file system management module - fs. Unfortunately, we can not do this on the client side. Fs is an empty object here. It's time to go back to the view components and consume the global data in them.
          </p>
          <h3 id="consumption-stage" :style="{ fontSize: computedStyle.fontSizeH3 }">Consumption stage</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Let's go back to our "stupid" Day component and we're going to make it smarter. We are able to receive and manage global data in any child component of the StateProvider. And for this purpose we're going to use the useContext hook:
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import React, { useContext, useEffect } from 'react';

  import { globalStateContext } from '../../store';

  const Day = () => {

    const { dayState: { day }, dayDispatch } = useContext(globalStateContext);

    useEffect(
      () => dayDispatch({ type: 'SET_DAY', payload: 9 }),
      [ dayDispatch ]
    );

    return <span>{ day }</span>;
  };

  export default Day;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            If you prefer to use ChristmasTreeProvider, then the changes are not significant: <code>import { dayContext } ...</code> instead <code>import { globalStateContext } ...</code>, and <code>... useContext(dayContext);</code> instead <code>... useContext(globalStateContext);</code>. Just change namespaces.
          </p>
          <h3 id="work-capacity-checking" :style="{ fontSize: computedStyle.fontSizeH3 }">Work capacity checking</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Here we are at the finish line. The application is already running and using global state. As I mentioned in the skeleton section, we're returning to the ManualDitInitializer code that needs for a test purpose:
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import React, { useState, useContext } from 'react';

  import { globalStateContext } from '../store';

  const ManualDateInitializer = () => {

    const {
      dayDispatch,
      monthDispatch,
      yearDispatch } = useContext(globalStateContext);

    const [ day, setDay ] = useState('');
    const [ month, setMonth ] = useState('');
    const [ year, setYear ] = useState('');

    const changeDate = (event) => {

      event.preventDefault();

      if (day) dayDispatch({ type: 'SET_DAY', payload: day });
      if (month) monthDispatch({ type: 'SET_MONTH', payload: month });
      if (year) yearDispatch({ type: 'SET_YEAR', payload: year });
    };

    return (
      &lt;form onSubmit={changeDate}&gt;

        &lt;label&gt;
          Day:
          &lt;input
            type='text'
            onChange={(event) =&gt; setDay(event.target.value)}
          /&gt;
        &lt;/label&gt;

        &lt;label&gt;
          Month:
          &lt;input
            type='text'
            onChange={(event) =&gt; setMonth(event.target.value)}
          /&gt;
        &lt;/label&gt;

        &lt;label&gt;
          Year:
          &lt;input
            type='text'
            onChange={(event) =&gt; setYear(event.target.value)}
          /&gt;
        &lt;/label&gt;

        &lt;button type='submit'>Change date&lt;/button&gt;
      &lt;/form&gt;
    );
  };

  export default ManualDateInitializer;
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Despite the voluminous code, there is nothing much to say about the component. All implementation details should already be familiar to you. In fact, unlike the Day, Month, Year components, we simply dispatch in manual mode, not programmatically.
          </p>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Again, if you prefer using ChristmasTreeProvider, then just replace the following snippet of code
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  const {
    dayDispatch,
    monthDispatch,
    yearDispatch } = useContext(globalStateContext);
          </code>
          <p>
            with
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  const { dayDispatch } = useContext(dayContext);
  const { monthDispatch } = useContext(monthContext);
  const { yearDispatch } = useContext(yearContext);
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            with corresponding imports.
          </p>
          <h2 id="conclusion" :style="{ fontSize: computedStyle.fontSizeH2 }">Conclusion</h2>
          <h3 id="redux-comparison" :style="{ fontSize: computedStyle.fontSizeH3 }">Comparison with Redux</h3>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Well, it is quite difficult not to compare the vanilla state with Redux, since Redux (MobX is pulling up) has become almost a de facto solution for managing the global state in any more or less large projects in recent years. Here we've considered an alternative to these third-party solutions. If we still need to do a comparison between implementations (ours and Redux), then I want to note that, unlike Redux (where it's achieved by createStore function), we had to implement the mechanism of connecting providers into one entity, the transfer of parameters. Thanks to useReducer and useContext hooks, this operation is quite simple. But in terms of data consumption, we have significantly reduced the code. All we need to do to get the state and manage it in our component:
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import { globalStateContext } from '../../store';
  ...
  const { dayState: { day }, dayDispatch } = useContext(globalStateContext);
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            And that's all - easy. And this is how it can look in Redux:
          </p>
          <code :style="{ fontSize: computedStyle.fontSizeP }" class="px-3">
  import { connect } from 'react-redux'

  import { Consumer } from 'somePathForContext';
  ...
  const Day = ({ day, setDay }) => {
  ...
  };

  const mapStateToProps = ({ dayState : { day }}) => {
    return { day }
  }

  /* I did not single out the action creator in a separate file for clarity of comparison because I did not do this in our application */

  const mapDispatchToProps = {
    setDay (day) {
      return { type: 'SET_DAY', payload: day }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Day);
          </code>
          <p :style="{ fontSize: computedStyle.fontSizeP }">
            Besides the fact that the vanilla code is faster and more compact, you no longer need to think about asynchronous actions. Use dispatching anywhere, in useEffect, create asynchronous functions, anywhere in native code. And by the way, do not forget about the need to combineReducers in Redux, which we do not need, because we implement this logic in our common provider. Someone can appeal - how about Redux middleware, for example, loggers, etc. (I hope you understand the uselessness of Thunk and similar things in the vanilla state approach). Well, these things are not a necessity for competent application engineering, but the resulting of the Redux architecture. No one bothers to write such things natively:) Well, I hope the article has helped you and, although I have nothing against Redux and treat it as a necessary intermediate solution in the history of React applications... I'm finishing the article with words that I have already met on the web: "it time to say goodbye Redux" (honestly, I didn't think about Redux when I started writing the article:)).
          </p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'VanillaGlobalStateInReact',
  props: [ 'computedStyle' ],
  data () {
    return {
      dayContextProviderValue: '{{ dayState, dayDispatch }}'
    }
  }
}
</script>
