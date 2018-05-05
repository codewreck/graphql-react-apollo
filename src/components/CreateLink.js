import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './LinkList'

class CreateLink extends React.Component {
  state = {
    description: '',
    url: '',
  }
  render(){
    return (
      <div>
        <div>
          <input
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for link"
          />
          <input
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type="text"
            placeholder="A url for link"
          />
        </div>
        <button onClick={() => this._createLink()}>Submit</button>
      </div>
    )
  }
  _createLink = async () => {
  const { description, url } = this.state
  await this.props.postMutation({
    variables: {
      description,
      url
    },
    update: (store, { data: { post } }) => {
   const data = store.readQuery({ query: FEED_QUERY })
   data.feed.links.splice(0, 0, post)
   store.writeQuery({
     query: FEED_QUERY,
     data,
   })
 },
  })
  this.props.history.push(`/`)
}
}

const POST_MUTATION = gql`
  # 2
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

export default graphql(POST_MUTATION, { name: 'postMutation' })(CreateLink)
