
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getPostList } from '../redux/post/actions'
import { Paper, Typography } from '@material-ui/core'
import ProfileComponent from '../components/ProfileComponent'
import Pic from '../static/housing.jpg'
import { HOUSING_FORM, ROOMMATE_FORM } from '../globalConstants'

const Home = ({ posts, postLoading, getPostList }) => {
  // After render
  useEffect(() => { getPostList() }, [])

  // Hooks
  const history = useHistory()

  // Handlers
  const handleSeeMore = () => history.push('/roommates')

  return (
    <div>
      <Paper style={{ padding: 10 }}>
        {posts.length > 0
          ?
          <>
            <Typography variant="h6" align="center">Latest Posts</Typography>
            {posts.slice(0, 3).map(post => (
              post.post_form_type === ROOMMATE_FORM
                ?
                <ProfileComponent
                  key={post.owner.id}
                  name={post.owner.first_name + " " + post.owner.last_name}
                  desc={post.owner.bio}
                  pic={post.owner.profile_pic}
                  type={ROOMMATE_FORM}
                  id={post.id}
                />
                :
                <ProfileComponent
                  key={post.id}
                  name={post.selected_choices[0][0].choice}
                  desc={post.selected_choices[0][1].choice}
                  pic={Pic}
                  type={HOUSING_FORM}
                  id={post.id}
                />
            ))}
            <Typography align="center">
              <Link variant="body2" onClick={handleSeeMore}>
                See more
              </Link>
            </Typography>
          </>
          :
          <>
            {!postLoading && (
              <div style={{ textAlign: "center" }}>
                {/* No post */}
                <Typography variant="subtitle1">No post.</Typography>
              </div>
            )}
          </>
        }
      </Paper>
    </div>
  )
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  postLoading: state.post.postLoading,
})

const mapDispatchToProps = {
  getPostList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)