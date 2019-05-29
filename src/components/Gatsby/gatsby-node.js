const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allContentfulAuthor {
        edges {
          node {
            name
          }
        }
      }
    }
  `).then(({ data: { allContentfulAuthor: { edges } } }) => {
    edges.forEach(({ node }) => {
      createPage({
        path: `/${node.name.replace(' ', '')}`,
        component: path.resolve('./src/templates/index.js'),
        context: {
          slug: node.name
        }
      });
    });
  });
};