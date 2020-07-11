import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Users/login';
import Logout from './components/Users/logout';
import Article from './components/Article/index';

import Admin from './components/Admin/index';
import AddPosts from './components/Admin/Posts/add.component';
import EditPost from './components/Admin/Posts/edit.component';
import AdminPosts from './components/Admin/Posts/posts.component'; 


// HOC
import MainLayout from './components/HOC/MainLayout';
import Auth from './components/HOC/auth';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route path="/admin/posts/edit/:id" component={Auth(EditPost,true)}/>
          <Route path="/admin/posts/create" component={Auth(AddPosts,true)}/>
          <Route path="/admin/posts" component={Auth(AdminPosts,true)}/>
          <Route path="/article/:id" component={Auth(Article)}/>
          <Route path="/admin" component={ Auth(Admin, true) }/>
          <Route path="/logout" component={Auth(Logout, true)}/>
          <Route path="/login" component={ Auth(Login, false) }/>
          <Route path="/" component={ Auth(Home) }/>
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
