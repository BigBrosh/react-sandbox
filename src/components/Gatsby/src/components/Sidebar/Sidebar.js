import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { NavItem, NavList, Sidebar } from './styledComponents';

export default () => (
  <StaticQuery
    query={graphql`
      {
        allContentfulAuthor {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={({ allContentfulAuthor: { edges } }) => (
      <Sidebar>
        <nav>
          <NavList>
            {edges.map(({ node }) => (
              <NavItem key={node.id}>
                <Link to={`/${node.name.replace(' ', '')}`}>
                  {node.name}
                </Link>
              </NavItem>
            ))}
          </NavList>
        </nav>
      </Sidebar>
    )}
  />
);