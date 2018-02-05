import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'


class LinkList extends Component {
  render() {
    const { loading, error, feed } = this.props.feedQuery;
    if (loading) {
      return <div>Loading</div>
    }
    if (error) {
      return <div>Error</div>
    }
    const linksToRender = feed.links;
    return (
      <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
    )
  }
}

// 1
const FEED_QUERY = gql`
  # 2
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

// 3
export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList)