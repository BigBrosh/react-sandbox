import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default ({
  data: {
    allContentfulAuthor: {
      edges: [
        {
          node: {
            name,
            writtenBooks,
            biography: {
              biography
            }
          }
        }
      ]
    }
  }
}) => {
  return (
    <Layout>
      <h2>Author {name}</h2>
      <p>Wrote {writtenBooks}</p>
      {documentToReactComponents(JSON.parse(biography))}
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    allContentfulAuthor(filter: { name: { eq: $slug } }) {
      edges {
        node {
          name
          writtenBooks
          biography {
            biography
          }
        }
      }
    }
  }
`;
