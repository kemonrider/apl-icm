import React from 'react';

import OnboardingPage from './src/page/Onboarding';
import NewsfeedPage from './src/page/Newsfeed';
import LoginPage from './src/page/Login';

export default class App extends React.Component {
  render() {
    return (
      // <OnboardingPage />
      <NewsfeedPage />
      // <LoginPage />
    );
  }
}
