import React from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends React.Component {
  render(){
    // const linksToRender = [
    //   {
    //     id: '1',
    //     description: 'Prisma turns your database into a GraphQL API 😎 😎',
    //     url: 'https://www.prismagraphql.com',
    //   },
    //   {
    //     id: '2',
    //     description: 'The best GraphQL client',
    //     url: 'https://www.apollographql.com/docs/react/',
    //   },
    // ]
    if(this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>
    }
    if(this.props.feedQuery && this.props.feedQuery.error){
      return <div>Error</div>
    }

    const linksToRender = this.props.feedQuery.feed.links

    return (
      <div>
        {linksToRender.map((link) => <Link key={link.id} link={link} /> )}
      </div>
    )
  }
}

const FEED_QUERY = gql`
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
export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList)
