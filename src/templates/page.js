import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { get } from 'lodash/fp'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ContentfulRichText from '../components/ContentfulRichText'

const PageTemplate = ({ data, location }) => {
  const page = get('contentfulPage', data)
  const siteTitle = get('site.siteMetadata.title', data)

  return (
    <Layout location={location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${page.title} | ${siteTitle}`} />
      </div>
      <ContentfulRichText json={page.content.json} />
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPage(slug: { eq: $slug }) {
      title
      id
      slug
      content {
        json
      }
    }
  }
`
