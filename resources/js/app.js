/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/Example');


require('./echo')

import React from 'react'
import {render} from 'react-dom'
import {InertiaApp} from '@inertiajs/inertia-react'
import {InertiaProgress} from '@inertiajs/progress'

InertiaProgress.init()

// import route from 'ziggy-js';
// import { Ziggy } from './ziggy';
//
// route('home', undefined, undefined, Ziggy);

// const app = document.getElementById('app')
//
// render(
//     <InertiaApp initialPage={JSON.parse(app.dataset.page)}
//                 resolveComponent={name => import(`./Pages/${name}`).then(module => module.default)}/>,
//     app
// )

import { createInertiaApp } from '@inertiajs/inertia-react'
import {Provider} from "react-redux"
import store, {persistor} from "./stores/store"
import {PersistGate} from "redux-persist/integration/react"


createInertiaApp({
  id: 'app',
  resolve: name => require(`./Pages/${name}`),
  setup({ el, App, props }) {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App {...props} />
        </PersistGate>
      </Provider>
      , el)
  },
})