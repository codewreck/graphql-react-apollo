import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends React.Component {
  render(){
    const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div>
      <div>
        <div>Hacker News</div>
        <Link to="/">
          new
        </Link>
        <Link to="/search"Search></Link>
        {authToken && (
          <div>
            <Link to="/create">
              submit
            </Link>
          </div>
        )}
      </div>
      <div>
        {authToken ? (
          <div
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push(`/`)
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login">
            login
          </Link>
        )}
      </div>
    </div>
  )
  }
}

export default withRouter(Header)
