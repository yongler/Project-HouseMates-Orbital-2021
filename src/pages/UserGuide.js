import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";

import chatPic from "../static/chat.png";
import roommateAddPic from "../static/roommates-button.png";
import roommateResultsPic from "../static/roommate-results2.png";
import filterPic from "../static/filter.png";
import searchPic from "../static/search.png";
import darkmodePic from "../static/darkmode.png";
import dashboardPic from "../static/dashboard.png";
import userguidePic from "../static/userguide.png";
import housingPic from "../static/housing.jfif";

// import { editJustRegistered } from "../redux/auth/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UserGuide = ({ user, editJustRegistered, userGuide }) => {
  // states
  const [open, setOpen] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [currentCount, setCurrentCount] = useState(0);

  // handlers
  const handleBack = () => {
    setCurrentCount(currentCount - 1);
  };

  const handleNext = () => {
    if (currentCount === allTexts.length - 1) {
      editJustRegistered(user.first_name, user.last_name, user.id, false);
    } else {
      setCurrentCount(currentCount + 1);
    }
  };

  // constants
  const useStyles = makeStyles((theme) => ({
    Card: {
      width: 300,
      margin: "auto",
    },
    Media: {
      height: "auto",
      width: "80%",
      border: "2px solid #555",
    },
  }));

  const classes = useStyles();

  // hardcoded display items
  const allTexts = [
    {
      pic: dashboardPic,
      text: "This is your own personalised dashboard, where you can have an overview of the whole website. Also, you can visit the other pages from the side navigation bar on the left",
    },
    {
      pic: roommateAddPic,
      text: "Click on the add button to find your ideal housemate and see your top 3 candidates in the user dashboard",
    },
    {
      pic: roommateResultsPic,
      text: "Now you can see the results of the matchmaking algorithm as well as edit or delete your post",
    },
    {
      pic: searchPic,
      text: "Use the search bar to quickly search through the posts!",
    },
    {
      pic: filterPic,
      text: "To locate your post, select the my post filter on the right",
    },
    {
      pic: chatPic,
      text: "Click on any of the posts for more details. Inside, you can click on the chat icon to contact the other person. New messages will also be shown on the side navigation bar",
    },
    {
      pic: housingPic,
      text: "Add housing posts to your favourites via the heart icon on the top right hand corner! You can conveniently see them in the dashboard afterwards",
    },

    {
      pic: darkmodePic,
      text: "You can also toggle between darkmode and lightmode in HouseMates!",
    },
    {
      pic: userguidePic,
      text: "If you want to see the user guide again, find me in the user dashboard!",
    },
  ];

  return (
    <div>
      <Dialog
        open={user && user.just_registered}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Welcome to HouseMates!"}
        </DialogTitle>
        <DialogContent>
          <div align="center">
            <img
              src={allTexts[currentCount]["pic"]}
              className={classes.Media}
            />
          </div>
          <DialogContentText
            id="alert-dialog-slide-description"
            align="center"
            variant="h5"
          >
            {currentCount + 1}. {allTexts[currentCount]["text"]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleBack}
            color="primary"
            disabled={currentCount === 0}
          >
            Previous
          </Button>
          <Button color="primary" onClick={handleNext}>
            {currentCount === allTexts.length - 1 ? "Done" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {
//   editJustRegistered,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserGuide);
export default UserGuide;
