import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './App.jsx'
import * as utils from './utils.js'
import moox from 'moox'
import schema from './models/schema'
import PropTypes from 'prop-types'

export default function (config = {}) {
  if (config.lang) {
    utils.setLang(config.lang);
  }


  const Model = moox({
    schema
  })
  if (config.format) {
    Model.__jsonSchemaFormat = config.format
  } else {
    Model.__jsonSchemaFormat = utils.format
  }

  if (config.mock) {
    Model.__jsonSchemaMock = config.mock
  }


  const store = Model.getStore();

  const Component = (props) => {
    return <Provider store={store} className="wrapper">
      <App Model={Model} {...props} />
    </Provider>
  }

  Component.propTypes = {
    data: PropTypes.string,
    onChange: PropTypes.func,
    showEditor: PropTypes.bool
  }
  return Component;

}

