import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  /* Colors */
  --black: #09090c;
  --dull: #a4b2bc;
  --white: #fefefe;
  --primary:#FFEE10;
  --bg-primary-dark: #0E141B;
  --bg-secondary-dark:#182635;
  --text-primary-black:rgba(0, 0, 0, 0.6);
  --text-secondary-black:rgba(0, 0, 0, 0.4);
  --text-primary-white:rgba(240, 240, 255, 0.95);
  --text-secondary-white:rgba(240, 240, 255, 0.85);

}

  html {
    --text-small: 0.9rem;
    --text-medium: 1rem;
    --text-large: 1.5rem;
    @media (min-width: 1024px) {
      --text-small: 1rem;
      --text-medium: 1.5rem;
      --text-large:2rem;
    }
  }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-primary-dark);
}
  h1{
    font-size: var(--text-large);
   font-weight: 500;
    color: var(--text-primary-white);
   
  }

  h2{
    font-size: var(--text-medium);
    color: var(--text-secondary-white);
    font-weight: 400;
  }
  h3{
font-size: var(--text-small);
color: var(--text-secondary-white);
font-weight: lighter;
  }

  h4{
    font-size:  var(--text-small);
color: var(--primary);
text-transform: uppercase;
  }
  h5{
    font-size:  var(--text-small);
color: var(--text-primary-white);
text-transform: uppercase;
  }


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

a{
  text-decoration: none;
  font-size: --text-medium;
color: var(--text-primary-white);
}




p{
  font-size: --text-medium;
color: var(--white);
  
    line-height: 1.5;
}

span{
  font-size: --text-small;

color: var(--dull);
}

img{
    max-width: 100%;
    object-fit: contain;
}

section{
  padding: 1em;
}


button{
  padding: 1em 2em 1em 2em;
  border-radius: 6px;
  background: none;
  border: 1px solid var(--white);
  cursor: pointer;
  transition: 0.5s ease;


  &:hover{
     color: #fff;
    box-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px blue;
    text-shadow: 0 0 6px blue;
  }
}


`;

export default GlobalStyles;
