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
import { getQuestions } from "../redux/form/actions";

// RoommateForm consists of stepper, (((summary of questions and user inputs) and (back and submit buttons)), or ((list of questions with their corresponding list of choices based on category) and (back and next buttons))), dependent on current category. A confirmation dialog will popped up upon submission.
const RoommateForm = ({ getQuestions, questionList }) => {
  // Styling
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
      // display: 'flex',
      // flexDirection: 'column',
      // alignItems: 'center',
    },
    flex: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: 250,
      // alignItems: 'center',
    },
    category: {
      marginBottom: 10,
    },
    active: {
      background: theme.palette.action.hover,
    },
  }));

  // Data (hard coded for now)
  const categories = [
    "Personality",
    "Work/Study",
    "Interests",
    "Habits",
    "Room Preferences",
    "Confirmation",
  ];
  // const questionList = [
  //   {
  //     id: 1,
  //     question: "Age",
  //     choices: ["20s", "30s", "40s"],
  //     category: "Personality",
  //   },
  //   {
  //     id: 2,
  //     question: "Nationality",
  //     choices: ["Malaysian", "Singaporean", "Others"],
  //     category: "Work/Study",
  //   },
  //   {
  //     id: 3,
  //     question: "Cat or Dog",
  //     choices: ["Cat person", "Dog person"],
  //     category: "Interests",
  //   },
  //   {
  //     id: 4,
  //     question: "Smoker",
  //     choices: ["Yes", "No"],
  //     category: "Habits",
  //   },
  //   {
  //     id: 5,
  //     question: "Working shift",
  //     choices: ["Morning", "Night"],
  //     category: "Room Preferences",
  //   },
  //   {
  //     id: 6,
  //     question: "Alcoholic",
  //     choices: ["Yes", "No"],
  //     category: "Habits",
  //   },
  // ];

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // Helper functions
  const completed = (category) => {
    return questionList
      .filter((question) => question.category === categories[category])
      .reduce((prev, curr) => prev && variables[curr.id - 1] !== "", true);
  };

  // States
  const [formFields, setFormFields] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [maxCategory, setMaxCategory] = useState(0);
  const [categoryCompleted, setCategoryCompleted] = useState({});
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [catDog, setCatDog] = useState("");
  const [smoker, setSmoker] = useState("");
  const [workingShift, setWorkingShift] = useState("");
  const [alcoholic, setAlcoholic] = useState("");
  const variables = [age, nationality, catDog, smoker, workingShift, alcoholic];
  const functions = [
    setAge,
    setNationality,
    setCatDog,
    setSmoker,
    setWorkingShift,
    setAlcoholic,
  ];

  // Handlers
  const handleNext = () => {
    window.scrollTo(0, 0);
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
  const handleChange = (input) => (e) => functions[input](e.target.value);
  const handleConfirmation = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRedirect = () => {
    setOpen(false);
    history.push("/roommates");
  };

  useEffect(() => {
    getQuestions();
    window.scrollTo(0, 0);
  }, []);

  const stepper = (
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
  );

  const summary = (
    <Box mt={5} className={classes.flex}>
      <Grid container spacing={2}>
        {categories
          .filter((category) => category !== "Confirmation")
          .map((category) => (
            <Grid container className={classes.category} key={category}>
              {/* Category */}
              <Grid item xs={12}>
                <Typography variant="h6">{category}</Typography>
              </Grid>

              <Grid container item xs={12}>
                {questionList
                  .filter((question) => question.category === category)
                  .map((question) => (
                    <Grid container item xs={12} key={question.id}>
                      {/* Question */}
                      <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                          {question.question}
                        </Typography>
                      </Grid>

                      {/* User input */}
                      <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                          {variables[question.id - 1]}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
      </Grid>

      {/* Back and submit buttons */}
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
  );

  const questionsBasedOnCategory = (
    <Box className={classes.flex}>
      {questionList
        .filter((question) => question.category === categories[currentCategory])
        .map((question) => (
          <Box mt={5} key={question.id}>
            <FormControl>
              {/* Question */}
              <FormLabel>
                <Typography variant="h6" color="textPrimary">
                  {question.question}
                </Typography>
              </FormLabel>

              {/* List of choices */}
              <RadioGroup
                onChange={handleChange(question.id - 1)}
                value={variables[question.id - 1]}
              >
                {question.choice_set.map((choice) => (
                  <FormControlLabel
                    value={choice}
                    control={<Radio color="primary" />}
                    label={choice}
                    key={choice}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        ))}

      {/* Back and next buttons */}
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
  );

  return (
    <Paper className={classes.paper}>
      {stepper}

      <div>
        {currentCategory === categories.length - 1
          ? summary
          : questionsBasedOnCategory}
      </div>

      {/* Confirmation dialog */}
      <Confirmation
        open={open}
        handleClose={handleClose}
        handleRedirect={handleRedirect}
      />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  questionList: state.form.question_list,
})

export default connect(mapStateToProps, { getQuestions })(RoommateForm)
