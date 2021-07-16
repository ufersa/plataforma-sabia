import React from 'react';
import { Layout as LayoutRA } from 'react-admin';
import TreeMenu from '@bb-tech/ra-treemenu';
import AppBar from './AppBar';

// eslint-disable-next-line react/jsx-props-no-spreading
const Layout = (props) => <LayoutRA {...props} appBar={AppBar} menu={TreeMenu} />;

export default Layout;
