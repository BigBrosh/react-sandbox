import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { NavItem, NavList, Sidebar } from './styledComponents';

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
        <nav>
          <NavList>
            {edges.map(({ node: { id, path } }) => (
              <NavItem key={id}>
                <Link to={path}>
                  {path}
                </Link>
              </NavItem>
            ))}
          </NavList>
        </nav>
      </Sidebar>
    )}
  />
);