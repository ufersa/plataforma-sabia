import React from 'react';
import { Layout as LayoutRA } from 'react-admin';
import AppBar from './AppBar';
import TreeMenu from '@bb-tech/ra-treemenu';

// eslint-disable-next-line react/jsx-props-no-spreading
const Layout = (props) => <LayoutRA {...props} appBar={AppBar} menu={TreeMenu} />;

export default Layout;
