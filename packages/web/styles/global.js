import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
	padding: 0;
    outline: 0;
    box-sizing: border-box;
	font-family: 'Rubik', sans-serif;
  }
  *:focus {
    outline: 0;
  }
  html, body {
    height: 100vh;
	background: #fff;

  }
  html{
    font-size: 62.5%;
  }
  body{
    -webkit-font-smoothing: antialiased;
	font-size: 1.6rem;
  }
  input, button{
    font: 1.4rem;
  }
  a{
    text-decoration: none;
	transition: all 0.2s ease;

	:hover{
		color: #2a41e8 !important;
	}
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
  h1,h2,h3,h4,h5,h6{
	font-weight: 500;
	color: rgb(17, 17, 17);
	font-variant-ligatures: common-ligatures;
  }
`;
