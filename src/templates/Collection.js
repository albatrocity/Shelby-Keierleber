import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { get, head, find } from 'lodash/fp'

import Layout from '../components/Layout'
import CollectionBrowser from '../components/CollectionBrowser'

const CollectionTemplate = ({ data, location, slug, pageContext }) => {
  const category = get('contentfulCategory', data)
  const collections = get('collection', category)
  const collection = find({ slug: get('slug', pageContext) }, collections)
  const artwork = head(get('work', collection) || [])
  const siteTitle = get('site.siteMetadata.title', data)

  return (
    <Layout location={location} category={category} collection={collection}>
      <Helmet
        title={`${collection.title} | ${category.title} | ${siteTitle}`}
      />
      <CollectionBrowser
        collections={collections}
        collection={collection}
        category={category}
        artwork={artwork}
      />
    </Layout>
  )
}

export default CollectionTemplate

export const categoryQuery = graphql`
  query CollectionBySlug($categorySlug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCategory(slug: { eq: $categorySlug }) {
      title
      id
      slug
      collection {
        slug
        title
        work {
          slug
          title
          description {
            json
          }
          images {
            id
            thumbnail: fluid(
              maxWidth: 200
              quality: 80
              cropFocus: CENTER
              maxHeight: 200
              resizingBehavior: THUMB
            ) {
              ...GatsbyContentfulFluid
            }
            large: fluid(maxWidth: 2000, quality: 90) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`