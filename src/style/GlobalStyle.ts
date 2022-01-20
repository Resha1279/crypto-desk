import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  /* Colors */
  --black: #09090c;
  --grey: #a4b2bc;
  --white: #fff;
  --background: rgba(200, 200, 200);
  --text-primary-black:rgba(0, 0, 0, 0.6);
  --text-secondary-black:rgba(0, 0, 0, 0.4);
  --text-primary-white:rgba(255, 255, 255, 0.85);
  --text-secondary-white:rgba(255, 255, 255, 0.65);
--text-color:#ffee10;
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
  background-color: var(--background);
}

p{
  
    line-height: 1.5;
}

img{
    max-width: 100%;
}
`;

export default GlobalStyles;
