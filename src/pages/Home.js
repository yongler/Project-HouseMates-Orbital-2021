
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPostList } from '../redux/post/actions'
import { Paper, Typography } from '@material-ui/core'
import ProfileComponent from '../components/ProfileComponent'
import Pic from '../static/housing.jpg'
import { ROOMMATE_FORM } from '../globalConstants'

// Empty for now
const Home = ({ posts, getPostList }) => {
  // States
  const [latestPosts, setLatestPosts] = useState([])

  useEffect(() => { getPostList() }, [])
  useEffect(() => setLatestPosts(posts.slice(-3)), [posts])

  return (
    <div>
      <Paper style={{ padding: 10 }}>
        <Typography variant="h6" align="center">Latest Posts</Typography>
        {latestPosts.map(post => (
          post.post_form_type === ROOMMATE_FORM
            ?
            <ProfileComponent
              name={post.owner.first_name + " " + post.owner.last_name}
              desc={post.owner.bio}
              pic={post.owner.profile_pic}
            />
            :
            <ProfileComponent
              name={post.selected_choices[0][0].choice}
              desc={post.selected_choices[0][1].choice}
              pic={Pic}
            />
        ))}
        <Typography variant="body1" color="textSecondary" align="center">See more</Typography>
      </Paper>
    </div>
  )
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
})

const mapDispatchToProps = {
  getPostList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)