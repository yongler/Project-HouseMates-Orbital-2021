import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getPostList } from '../redux/post/actions'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import ProfileComponent from '../components/ProfileComponent'
import { HOUSING_FORM, ROOMMATE_FORM } from '../globalConstants'
import Footer from '../components/Footer'
import Logo from '../static/housemates-logo-without-text-black.svg'
import Pic from '../static/home.jpg'
import Mates from '../static/mates.jpg'
import House from '../static/house.jpg'
import Chat from '../static/chat.png'
import RoommateCard from '../components/RoommateCard'
import HousingCard from '../components/HousingCard'

const Home = ({ posts, housingPosts, postLoading, getPostList }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    button: {
      borderRadius: 20,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  }))

  // After render
  useEffect(() => { getPostList(ROOMMATE_FORM) }, [])
  useEffect(() => { getPostList(HOUSING_FORM) }, [])

  // Hooks
  const history = useHistory()
  const classes = useStyles()

  // Handlers
  const handleLogin = () => history.push('/login')
  const handleRegister = () => history.push('/register')
  const handleSeeMore = () => history.push('/roommates')

  return (
    <Grid container>
      <Paper style={{ width: "100%", margin: 20, marginTop: 20, padding: 10 }}>
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt="home"
            src={Pic}
            height="400"
            style={{ opacity: 0.3 }}
          />

          <div style={{ position: "absolute", width: "100%", height: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img alt="logo" src={Logo} width="100" height="100" style={{ marginRight: 20 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h2">
                Welcome to HouseMates.
              </Typography>
              <Typography variant="h5">
                Your one stop solution to a warm stay in Singapore.
              </Typography>
            </div>
          </div>
        </Grid>
      </Paper>

      <Paper style={{ width: "100%", margin: 20, padding: 50, marginTop: 80 }}>
        <Grid container item xs={12}>
          {/* Video */}
          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            Video
          </Grid>

          {/* Login & register */}
          <Grid item xs={6} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1">
              We cater towards your accomodation related needs,
            </Typography>
            <Typography variant="body1">
              be it finding an accomodation with a housemate, or hosting your housings.
            </Typography>
            <Typography variant="body1">
              Login or sign up now! No phone numbers required.
            </Typography>
            <div style={{ marginTop: 30 }}>
              <Button variant="outlined" style={{ marginRight: 10 }} onClick={handleLogin} className={classes.button}>Login</Button>
              <Button variant="outlined" onClick={handleRegister} className={classes.button}>Register</Button>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Paper style={{ width: "100%", margin: 20, padding: 50, marginTop: 80 }}>
        <Grid container item xs={12}>
          <Grid item xs={6} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1">
              With our latest matchmaking algorithm,
            </Typography>
            <Typography variant="body1">
              you can now be automatically paired with the next best candidate.
            </Typography>
            <Typography variant="body1">
              Create an account to watch the algorithm does its magic!
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <img alt="mates" src={Mates} height="250" />
          </Grid>
        </Grid>
      </Paper>

      <Grid container item xs={12} style={{ marginTop: 80 }}>
        {posts.length > 0
          ?
          <>
            <Grid container item xs={12} >
              {posts.slice(0, 3).map(post =>
                <Grid item xs={12} md={6} lg={4} key={post.id} style={{ display: "flex", flexDirection: "column" }}>
                  <RoommateCard post={post} />
                </Grid>)}
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Typography align="center">
                <Link variant="body2" onClick={handleSeeMore}>
                  See more
                </Link>
              </Typography>
            </Grid>
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
      </Grid>

      <Paper style={{ width: "100%", margin: 20, padding: 50, marginTop: 80 }}>
        <Grid container item xs={12}>
          <Grid item xs={6} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1">
              Have a room to spare?
            </Typography>
            <Typography variant="body1">
              We got you covered.
            </Typography>
            <Typography variant="body1">
              Showcase your properties with a comprehensive
            </Typography>
            <Typography variant="body1">
              tagging feature that ensure maximum customer traffic.
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <img alt="house" src={House} height="250" />
          </Grid>
        </Grid>
      </Paper>

      <Grid container item xs={12} style={{ marginTop: 80 }}>
        {housingPosts.length > 0
          ?
          <>
            <Grid container item xs={12}>
              {housingPosts.slice(0, 3).map(post =>
                <>
                  <Grid item xs={1} />
                  <Grid item xs={10} key={post.id} style={{ marginBottom: 30 }}>
                    <HousingCard post={post} />
                  </Grid>
                  <Grid item xs={1} />
                </>)}
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Typography align="center">
                <Link variant="body2" onClick={handleSeeMore}>
                  See more
                </Link>
              </Typography>
            </Grid>
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
      </Grid>

      <Paper style={{ width: "100%", margin: 20, padding: 50, marginTop: 80 }}>
        <Grid container item xs={12}>
          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <img alt="chat" src={Chat} height="250" />
          </Grid>
          <Grid item xs={6} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1">
              Your privacy is our priority.
            </Typography>
            <Typography variant="body1">
              Housing an in-built chat function,
            </Typography>
            <Typography variant="body1">
              contacting each other has never been more hassle-free.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid item xs={12} style={{ marginTop: 80 }}>
        <Footer />
      </Grid>
    </Grid >
  )
}

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  housingPosts: state.post.housingPosts,
  postLoading: state.post.postLoading,
})

const mapDispatchToProps = {
  getPostList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)