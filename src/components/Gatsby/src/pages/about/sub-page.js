import React from 'react';
import Layout from '../../components/Layout';
import { StaticQuery, graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default () => (
  <StaticQuery
    query={graphql`
      {
        allContentfulAuthor {
          nodes {
            name
            writtenBooks
            biography {
              biography
            }
          }
        }
      }
    `}
    render={({
      allContentfulAuthor: {
        nodes
      }
    }) => (
      <Layout>
        {
          nodes.map(({
            name,
            writtenBooks,
            biography
          },
          index
          ) => (
            <div key={`${name} ${index}`}>
              <h2>Author {name}</h2>
              <p>Wrote {writtenBooks}</p>
              {documentToReactComponents(JSON.parse(biography.biography))}
            </div>
          ))
        }
      </Layout>
    )}
  />
);