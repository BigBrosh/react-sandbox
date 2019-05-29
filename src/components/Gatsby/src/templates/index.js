import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Helmet from 'react-helmet/es/Helmet';

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{name}</title>
        <meta name="description" content={`${name} has wrote ${writtenBooks}`}/>
      </Helmet>
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
