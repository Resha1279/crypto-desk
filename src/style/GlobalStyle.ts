import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  /* Colors */
  --black: #09090c;
  --grey: #a4b2bc;
  --white: #fff;
  --background: rgba(137, 171, 245, 0.37);
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

a{
  text-decoration: none;
}



body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fefefe;
}

p{
    opacity: 0.6;
    line-height: 1.5;
}

img{
    max-width: 100%;
}
`;

export default GlobalStyles;
