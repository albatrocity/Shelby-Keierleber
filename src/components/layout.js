import React from 'react'
import { Link } from 'gatsby'
import Navigation from './Navigation'
import { Main, Grommet, Header, Box } from 'grommet'
import theme from './theme'

const Layout = ({ children, location, category, collection }) => {
  let rootPath = `/`
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }

  return (
    <Grommet theme={theme} full>
      <Box
        width={{ max: '1200px' }}
        margin="auto"
        pad={{ horizontal: 'small' }}
      >
        <Box pad={{ top: 'medium' }} margin={{ bottom: 'small' }}>
          <Header border={{ side: 'bottom', color: 'light-3', size: 'small' }}>
            <Navigation category={category} collection={collection} />
          </Header>
        </Box>
        <Box as="main">{children}</Box>
      </Box>
    </Grommet>
  )
}

export default Layout
