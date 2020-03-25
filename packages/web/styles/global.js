import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
	padding: 0;
    outline: 0;
    box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
  }
  *:focus {
    outline: 0;
  }
  html, body {
    height: 100%;
  }
  html{
    font-size: 62.5%;
  }
  body{
    -webkit-font-smoothing: antialiased;
  }
  body, input, button{
    font: 1.4rem 'Roboto', sans-serif;
  }
  a{
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`;
