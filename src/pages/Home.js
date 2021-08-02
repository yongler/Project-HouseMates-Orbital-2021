import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPostList } from "../redux/post/actions";
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import ProfileComponent from "../components/ProfileComponent";
import { HOUSING_FORM, ROOMMATE_FORM } from "../globalConstants";
import Footer from "../components/Footer";
import Logo from "../static/housemates-logo-without-text-black.svg";
import Pic from "../static/home.jpg";
import Mates from "../static/mates.jpg";
import House from "../static/house.jpg";
import Chat from "../static/chat.png";
import RoommateCard from "../components/RoommateCard";
import HousingCard from "../components/HousingCard";
import promoVideo from "../static/2679.mp4";
import videoPoster from "../static/videoPoster.png";
import { ReactVideo } from "reactjs-media";
import { YoutubePlayer } from "reactjs-media";
import NavBar from "../components/NavBar";
import { withStyles } from "@material-ui/core/styles";

const Home = ({
  posts,
  housingPosts,
  postLoading,
  getPostList,
  setTheme,
  theme,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    button: {
      borderRadius: 20,
      borderColor: "black",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "black",
      },
      color: "black",
    },
    greyPaper: { background: "#f2f2f2" },
    blackText: { color: "#000000" },
  }));

  // After render
  useEffect(() => {
    getPostList(ROOMMATE_FORM);
  }, []);
  useEffect(() => {
    getPostList(HOUSING_FORM);
  }, []);

  // Hooks
  const history = useHistory();
  const classes = useStyles();

  // Handlers
  const handleLogin = () => history.push("/login");
  const handleRegister = () => history.push("/register");
  const handleSeeMore = () => history.push("/roommates");
  const handleSeeMoreHousing = () => history.push("/housings");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuButton = () => {
    setMenuOpen(!menuOpen);
  };

  const BlackTextTypography = withStyles({
    root: {
      color: "#000000",
    },
  })(Typography);

  return (
    <>
      <NavBar
        handleMenuButton={handleMenuButton}
        setTheme={setTheme}
        theme={theme}
        disableButton={true}
      />
      <br />
      <br />

      <Paper style={{ width: "100%" }} elevation={0}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            alt="home"
            src={Pic}
            width="100%"
            height="auto"
            style={{ opacity: 0.3 }}
          />

          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "600",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 200,
            }}
          >
            <img
              alt="logo"
              src={Logo}
              width="100"
              height="100"
              // style={{ marginRight: 20 }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h2">Welcome to HouseMates.</Typography>
              <Typography variant="h5">
                Your one stop solution to a warm stay in Singapore.
              </Typography>
            </div>
          </div>
        </Grid>
      </Paper>

      <div className={classes.greyPaper}>
        <Paper
          style={{ width: "100%", padding: 50 }}
          elevation={0}
          className={classes.greyPaper}
        >
          <Grid container item xs={12}>
            {/* Video */}
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <YoutubePlayer
                src="https://www.youtube.com/embed/jtneFF4psgM?autoplay=1&mute=1" // Required
                width={600}
                height={350}
              /> */}
              <iframe
                src="https://www.youtube.com/embed/jtneFF4psgM?autoplay=1&mute=1&controls=1"
                width="600"
                height="350"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </Grid>

            {/* Login & register */}
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BlackTextTypography
                variant="body1"
                align="center"
                color={classes.blackText}
              >
                Be it finding an accomodation with a housemate or promoting your
                properties,
              </BlackTextTypography>
              <BlackTextTypography
                variant="body1"
                align="center"
                color="primary"
              >
                we cater towards all your needs.
              </BlackTextTypography>
              <br />
              <BlackTextTypography
                variant="body1"
                align="center"
                color="primary"
              >
                Login or sign up now! No phone numbers required.
              </BlackTextTypography>
              <div style={{ marginTop: 30 }}>
                <Button
                  variant="outlined"
                  style={{ marginRight: 10 }}
                  onClick={handleLogin}
                  className={classes.button}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleRegister}
                  className={classes.button}
                >
                  Register
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <Paper style={{ width: "100%", padding: 50 }} elevation={0}>
          <Grid container item xs={12}>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                With our latest matchmaking algorithm,
              </Typography>
              <Typography variant="body1">
                you can now be automatically paired with the next best
                candidate.
              </Typography>
              <Typography variant="body1">
                Create an account to watch the algorithm does its magic!
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img alt="mates" src={Mates} height="250" />
            </Grid>
          </Grid>
        </Paper>

        <Grid
          container
          item
          xs={12}
          elevation={0}
          style={{ margin: 50 }}
          align="center"
        >
          <Grid item xs={6}>
            <BlackTextTypography
              variant="h4"
              align="left"
              style={{
                marginLeft: 120,
                marginBottom: 20,
              }}
              color="primary"
            >
              Latest Housemates
            </BlackTextTypography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              align="right"
              style={{ marginRight: 200, marginTop: 20 }}
            >
              <Link variant="body1" onClick={handleSeeMore}>
                See more
              </Link>
            </Typography>
          </Grid>
          {posts.length > 0 ? (
            <>
              <Grid container item xs={12}>
                {posts.slice(0, 3).map((post) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    key={post.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: 30,
                      // marginRight: 30,
                      marginLeft: 70,
                    }}
                  >
                    <RoommateCard post={post} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              {!postLoading && (
                <div style={{ textAlign: "center" }}>
                  {/* No post */}
                  <Typography variant="subtitle1">No post.</Typography>
                </div>
              )}
            </>
          )}
        </Grid>

        <Paper style={{ width: "100%", padding: 50 }} elevation={0}>
          <Grid container item xs={12}>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">Have a room to spare?</Typography>
              <Typography variant="body1">We got you covered.</Typography>
              <Typography variant="body1">
                Showcase your properties with a comprehensive
              </Typography>
              <Typography variant="body1">
                tagging feature that ensure maximum customer traffic.
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img alt="house" src={House} height="250" />
            </Grid>
          </Grid>
        </Paper>

        <Grid
          container
          item
          xs={12}
          className={classes.greyPaper}
          style={{ marginTop: 50 }}
        >
          <Grid item xs={6}>
            <BlackTextTypography
              variant="h4"
              align="left"
              style={{
                marginLeft: 150,
                marginBottom: 20,
              }}
              color="primary"
            >
              Latest Housings
            </BlackTextTypography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              align="right"
              style={{ marginRight: 150, marginTop: 20 }}
            >
              <Link variant="body1" onClick={handleSeeMoreHousing}>
                See more
              </Link>
            </Typography>
          </Grid>

          {housingPosts.length > 0 ? (
            <>
              <Grid container item xs={12} style={{ marginBottom: 30 }}>
                {housingPosts.slice(0, 3).map((post) => (
                  <>
                    <Grid item xs={1} />
                    <Grid
                      item
                      xs={10}
                      key={post.id}
                      style={{ marginBottom: 30 }}
                    >
                      <HousingCard post={post} />
                    </Grid>
                    <Grid item xs={1} />
                  </>
                ))}
              </Grid>
            </>
          ) : (
            <>
              {!postLoading && (
                <div style={{ textAlign: "center" }}>
                  {/* No post */}
                  <Typography variant="subtitle1">No post.</Typography>
                </div>
              )}
            </>
          )}
        </Grid>

        <Paper style={{ width: "100%", padding: 50 }} elevation={0}>
          <Grid container item xs={12}>
            <Grid
              item
              xs={12}
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img alt="chat" src={Chat} height="250" border="2px solid" />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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

        <Grid item xs={12}>
          <Footer />
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  housingPosts: state.post.housingPosts,
  postLoading: state.post.postLoading,
});

const mapDispatchToProps = {
  getPostList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
