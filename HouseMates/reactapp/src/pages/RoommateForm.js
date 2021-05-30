import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Confirmation from "../components/Confirmation";

import { getQuestions } from "../actions/form";

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1),
  },
  paper: {
    width: "100%",
    padding: 30,
    paddingBottom: 50,
    marginLeft: 23,
    marginRight: 23,
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 250,
  },
  category: {
    marginBottom: 10,
  },
  active: {
    background: theme.palette.action.hover,
  },
}));

const RoommateForm = ({ getQuestions, question_list }) => {
  const categories = [
    "Personality",
    "Work/Study",
    "Interests",
    "Habits",
    "Room Preferences",
    "Confirmation",
  ];
  // const questions = [
  //     {
  //         id: 1,
  //         question: "Age",
  //         choices: ["20s", "30s", "40s"],
  //         category: "Personality",
  //     },
  //     {
  //         id: 2,
  //         question: "Nationality",
  //         choices: ["Malaysian", "Singaporean", "Others"],
  //         category: "Work/Study",
  //     },
  //     {
  //         id: 3,
  //         question: "Cat or Dog",
  //         choices: ["Cat person", "Dog person"],
  //         category: "Interests",
  //     },
  //     {
  //         id: 4,
  //         question: "Smoker",
  //         choices: ["Yes", "No"],
  //         category: "Habits",
  //     },
  //     {
  //         id: 5,
  //         question: "Working shift",
  //         choices: ["Morning", "Night"],
  //         category: "Room Preferences",
  //     },
  //     {
  //         id: 6,
  //         question: "Alcoholic",
  //         choices: ["Yes", "No"],
  //         category: "Habits",
  //     },
  // ]

  const classes = useStyles();
  const history = useHistory();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [maxCategory, setMaxCategory] = useState(0);
  const [categoryCompleted, setCategoryCompleted] = useState({});
  const [open, setOpen] = useState(false);

  // const [age, setAge] = useState("");
  // const [nationality, setNationality] = useState("");
  // const [catDog, setCatDog] = useState("");
  // const [smoker, setSmoker] = useState("");
  // const [workingShift, setWorkingShift] = useState("");
  // const [alcoholic, setAlcoholic] = useState("");
  // const variables = [age, nationality, catDog, smoker, workingShift, alcoholic];
  // const functions = [
  //   setAge,
  //   setNationality,
  //   setCatDog,
  //   setSmoker,
  //   setWorkingShift,
  //   setAlcoholic,
  // ];

  const handleNext = () => {
    setCurrentCategory((prev) => prev + 1);
    setMaxCategory((prev) =>
      currentCategory >= maxCategory ? prev + 1 : prev
    );
    const newCategoryCompleted = categoryCompleted;
    newCategoryCompleted[currentCategory] = true;
    setCategoryCompleted(newCategoryCompleted);
  };
  const handleBack = () => setCurrentCategory((prev) => prev - 1);
  const handleStep = (category) => () =>
    category <= maxCategory ? setCurrentCategory(category) : null;
  // const handleChange = (input) => (e) => functions[input](e.target.value);
  const handleConfirmation = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRedirect = () => {
    setOpen(false);
    history.push("/roommates");
  };
  const completed = (category) => {
    return question_list.filter(
      (question) => question.category === categories[category]
    );
    // .reduce((prev, curr) => prev && variables[curr.id - 1] !== "", true);
  };

  useEffect(() => {
    getQuestions();
  }, [ ]);

  return (
    <Paper className={classes.paper}>
      <Stepper nonLinear alternativeLabel activeStep={currentCategory}>
        {categories.map((category, index) => (
          <Step key={category}>
            <StepButton
              onClick={handleStep(index)}
              completed={categoryCompleted[index]}
              className={index === currentCategory ? classes.active : null}
            >
              {category}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        {currentCategory === categories.length - 1 ? (
          <Box className={classes.flex} mt={5}>
            <Grid container spacing={2}>
              {categories
                .filter((category) => category !== "Confirmation")
                .map((category) => (
                  <Grid container className={classes.category} key={category}>
                    <Grid item xs={12}>
                      <Typography variant="h6">{category}</Typography>
                    </Grid>
                    <Grid container item xs={12}>
                      {question_list
                        .filter((question) => question.category === category)
                        .map((question) => (
                          <Grid container item xs={12} key={question.id}>
                            <Grid item xs={6}>
                              <Typography variant="body1" gutterBottom>
                                {question.question_text}
                              </Typography>
                            </Grid>
                            {/* <Grid item xs={6}>
                              <Typography variant="body1" gutterBottom>
                                {variables[question.id - 1]}
                              </Typography>
                            </Grid> */}
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                ))}
            </Grid>

            <Box mt={10}>
              <Button onClick={handleBack} className={classes.backButton}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmation}
              >
                Submit
              </Button>
            </Box>
          </Box>
        ) : (
          <Box className={classes.flex}>
            {question_list
              .filter(
                (question) => question.category === categories[currentCategory]
              )
              .map((question) => (
                <Box mt={5} key={question.id}>
                  <FormControl>
                    <FormLabel>
                      <Typography variant="h6" color="textPrimary">
                        {question.question_text}
                      </Typography>
                    </FormLabel>

                    <RadioGroup
                    // onChange={handleChange(question.id - 1)}
                    // value={variables[question.id - 1]}
                    >
                      {console.log('hi')};
                      {console.log(question.choice_set)};
                      {console.log(question.choice_set.all)};
                      {question.choice_set.all.map((choice) => (
                        console.log(choice)
                        // <FormControlLabel
                        //   value={choice}
                        //   control={<Radio color="primary" />}
                        //   label={choice}
                        //   key={choice}
                        // />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              ))}

            <Box mt={10}>
              <Button
                disabled={currentCategory === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                disabled={!completed(currentCategory)}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}
      </div>
      <Confirmation
        open={open}
        handleClose={handleClose}
        handleRedirect={handleRedirect}
      />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  question_list: state.form.question_list,
});

export default connect(mapStateToProps, { getQuestions })(RoommateForm);
