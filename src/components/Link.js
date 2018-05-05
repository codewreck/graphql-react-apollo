import React from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Link extends React.Component {
  render(){
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        <div>
          <span>{this.props.index + 1}.</span>
          {authToken && (
            <div onClick={() => this._voteForLink()}>
              ▲
            </div>
          )}
        </div>
        <div>
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div>
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    )
  }
  _voteForLink = async () => {
    const linkId = this.props.link.id
    await this.props.voteMutation({
      variables: {
        linkId,
      },
      update: (store, { data: { vote } }) => {
        this.props.updateStoreAfterVote(store, vote, linkId)
      },
    })
  }
}



const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
  `

export default graphql(VOTE_MUTATION, { name: 'voteMutation'}) (Link)
