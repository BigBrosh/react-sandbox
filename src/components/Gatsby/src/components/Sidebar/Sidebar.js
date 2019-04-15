import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { navItem, Sidebar } from './styledComponents';

export default () => (
  <StaticQuery
    query={graphql`
      {
        allSitePage {
          edges {
            node {
              id
              path
            }
          }
        }
      }
    `}
    render={({ allSitePage: { edges } }) => (
      <Sidebar>
        {edges.map(({ node: { id, path } }) => (
          <Link
            to={path}
            key={id}
            css={navItem}
          >
            {path}
          </Link>
        ))}
      </Sidebar>
    )}
  />
);