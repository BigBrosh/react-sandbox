import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { LogoImage, logoLink } from './styledComponents';

const Logo = () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {name: {eq:"logo"}}) {
          edges {
            node {
              publicURL
            }
          }
        }
      }
   `}
    render={({
      allFile: {
        edges: [
          {
            node: { publicURL }
          }
        ]
      }
    }) => (
      <Link to="/" css={logoLink}>
        <LogoImage src={publicURL} alt="logo"/>
      </Link>
    )}
  />
);

export default Logo;