import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends React.Component {
  render(){
    return (
      <div>
        <div>
          <div>Hacker news</div>
          <Link to="/">new</Link>
          <div>|</div>
          <Link to="/create">Submit</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
