import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GetContacts } from './components/GetContacts';
import { AddContact } from './components/AddContact';

export const routes = <Layout>
    <Route exact path='/' component={GetContacts} />
    <Route path='/addContact' component={AddContact} />
    <Route path='/edit/:key' component={AddContact} />  
</Layout>;
