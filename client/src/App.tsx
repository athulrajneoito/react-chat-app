import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./App.css";
import './assets/css/main.css'

const JoinChat = lazy(() => import("./pages/JoinChat/JoinChat"));
const CreateChat = lazy(() => import("./pages/CreateChat/CreateChat"));
const Chat = lazy(() => import("./pages/Chat/Chat"));


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <Route exact path="/" component={JoinChat} />
          <Route exact path="/join" component={JoinChat} />
          <Route exact path="/create" component={CreateChat} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
