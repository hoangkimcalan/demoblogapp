import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from '../store/store';
import "../styles/globals.css";
class MyApp extends React.Component<AppProps> {
  render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);