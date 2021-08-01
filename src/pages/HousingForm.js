import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Paper, Radio, RadioGroup, Select, Step, StepButton, Stepper, TextField, Typography,  IconButton } from '@material-ui/core'
import Confirmation from '../components/Confirmation'
import { getQuestions } from '../redux/form/actions'
import { getUserPosts, getPostList, createPost, editPost, resetCreatePostSuccess, resetEditPostSuccess } from '../redux/post/actions'
import { HOUSING_FORM, MULTIPLE_CHOICE, SINGLE_CHOICE, TEXT, SELECT, FILE } from '../globalConstants'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";


// HousingForm consists of stepper, (((summary of questions and user inputs) and (back and submit buttons)), or ((list of questions with their corresponding list of choices based on category) and (back and next buttons))), dependent on current category. A confirmation dialog will popped up upon submission.

const TextQuestion = ({ question, formFields, handleChange, currentCategory }) => (
  <>
    {/* Question */}
    <Typography variant="h6" color="textPrimary">
      {question.question_text}
    </Typography>

    {/* Input */}
    <TextField
      variant="outlined"
      fullWidth
      name={question.id}
      value={formFields[currentCategory]?.[question.id]?.choice}
      onChange={(e) => handleChange(e, currentCategory, SINGLE_CHOICE)}
    />
  </>
);

const FileQuestion = ({ question, formFields, handleCapture, currentCategory }) => {
  // Hooks
  const fileInput = useRef()

  // Handlers
  const handleClick = () => { fileInput.current.click() }

  return (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary">
        {question.question_text}
      </Typography>

      {/* Choices */}
      <input
        type="file"
        id="image"
        accept="image/png, image/jpeg"
        multiple
        onChange={(e) => handleCapture(e, currentCategory)}
        name={question.id}
        ref={fileInput}
        style={{ display: "none" }}
      />

      <Button variant="contained" color="primary" onClick={handleClick}>Upload</Button>

      <Typography variant="body1" display="inline" style={{ marginLeft: 10 }}>
        {formFields[currentCategory]?.[question.id]?.choice?.join(', ') || "No photo(s) uploaded."}
      </Typography>
    </>
  )
}

const HousingForm = ({
  user,
  getQuestions, housingQuestions,
  getPostList, housingCategories,
  createPost, createPostSuccess, resetCreatePostSuccess,
  editPost, editPostSuccess, resetEditPostSuccess,
  initialFormFields, id,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: 30,
      paddingBottom: 50,
      marginLeft: 23,
      marginRight: 23,
    },
    flex: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    category: {
      marginBottom: 10,
    },
    active: {
      background: theme.palette.action.hover,
    },
  }));

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // Helper functions
  const completed = (category) => {
    return housingQuestions
      .filter((question) => question.category === housingCategories[category])
      .reduce(
        (prev, curr) =>
          prev &&
          (Array.isArray(formFields[category]?.[curr.id]?.choice)
            ? formFields[category]?.[curr.id]?.choice.length > 0
            : formFields[category]?.[curr.id]?.choice),
        true
      );
  };

  // States
  const [formFields, setFormFields] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [maxCategory, setMaxCategory] = useState(0);
  const [categoryCompleted, setCategoryCompleted] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);

  // Handlers
  // Stepper
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
  const handleBack = () => {
    window.scrollTo(0, 0);
    setCurrentCategory((prev) => prev - 1);
  };
  const handleStep = (category) => () => category <= maxCategory ? setCurrentCategory(category) : null;

  // Form fields
  const handleChange = (e, category, type) => {
    switch (type) {
      case SINGLE_CHOICE:
        setFormFields({
          ...formFields,
          [category]: {
            ...formFields[category],
            [e.target.name]: {
              ...formFields[category]?.[e.target.name],
              question: e.target.name,
              choice: e.target.value,
            },
          },
        });
        break;

      case MULTIPLE_CHOICE:
        var choice = formFields[category]?.[e.target.name]?.choice || [];
        if (choice?.includes(e.target.value)) {
          choice.splice(choice.indexOf(e.target.value), 1);
        } else {
          choice.push(e.target.value);
        }
        setFormFields({
          ...formFields,
          [category]: {
            ...formFields[category],
            [e.target.name]: {
              ...formFields[category]?.[e.target.name],
              question: e.target.name,
              choice: choice,
            },
          },
        });
        break;

      default:
        break;
    }
  };
  const handleCapture = (e, category) => {
    setSelectedFile(e.target.files);
    setFormFields({
      ...formFields,
      [category]: {
        ...formFields[category],
        [e.target.name]: {
          ...formFields[category]?.[e.target.name],
          question: e.target.name,
          choice: Array.from(e.target.files).map(file => file.name),
        },
      },
    });
  };

  // Confirmation dialog
  const handleConfirmation = () => { setOpen(true); };
  const handleCancel = () => setOpen(false);
  const handleSubmit = () => {
    const data = Object.values(formFields).map((category) => Object.values(category));
    const userObj = {
      first_name: user.first_name,
      last_name: user.last_name,
    };
    if (id) {
      editPost(id, HOUSING_FORM, data, userObj, undefined, undefined, selectedFile);
    } else {
      createPost(HOUSING_FORM, data, userObj, selectedFile);
    }
  };
  const handleClose = () => {
    resetCreatePostSuccess();
    resetEditPostSuccess();
    setOpen(false);
    history.push("/housings");
  };

  // useEffects
  // Get housing form questions
  useEffect(() => { if (housingQuestions.length === 0) getQuestions(HOUSING_FORM); }, []);
  // Get housing form categories
  useEffect(() => { if (housingCategories.length === 0) getPostList(HOUSING_FORM); }, []);
  // Get existing housing form data
  useEffect(() => {
    if (initialFormFields) {
      setFormFields(initialFormFields);
      const allCompleted = housingCategories.reduce((prev, curr, index) => ({ ...prev, [index]: true }), {});
      setCategoryCompleted(allCompleted);
      setMaxCategory(housingCategories.length);
    }
  }, [initialFormFields, housingCategories]);

  // Components
  const SingleChoiceQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {question.question_text}
      </Typography>

      {/* Choices */}
      <FormControl>
        <RadioGroup
          name={question.id}
          value={formFields[currentCategory]?.[question.id]?.choice}
          onChange={(e) => handleChange(e, currentCategory, SINGLE_CHOICE)}
        >
          {question.choice_set.map((choice) => (
            <FormControlLabel
              key={choice}
              control={<Radio color="primary" />}
              value={choice}
              label={choice}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );

  const MultipleChoiceQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {question.question_text}
      </Typography>

      {/* Choices */}
      <FormControl>
        <FormGroup>
          {question.choice_set.map((choice) => (
            <FormControlLabel
              key={choice}
              control={<Checkbox color="primary" />}
              name={question.id}
              value={choice}
              label={choice}
              checked={formFields[currentCategory]?.[
                question.id
              ]?.choice?.includes(choice)}
              onChange={(e) =>
                handleChange(e, currentCategory, MULTIPLE_CHOICE)
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  );

  const SelectQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary">
        {question.question_text}
      </Typography>

      {/* Choices */}
      <Select
        variant="outlined"
        fullWidth
        name={question.id}
        value={formFields[currentCategory]?.[question.id]?.choice}
        onChange={(e) => handleChange(e, currentCategory, SINGLE_CHOICE)}
      >
        {question.choice_set.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </Select>
    </>
  );

  const stepper = (
    <Stepper nonLinear alternativeLabel activeStep={currentCategory}>
      {housingCategories.map((category, index) => (
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
    <Grid container>
      <Grid container item xs={12} style={{ padding: 48 }}>
        {housingCategories
          .filter((category) => category !== "Confirmation")
          .map((category, categoryIndex) => (
            <Grid
              container
              item
              xs={12}
              key={category}
              style={{ marginBottom: 32 }}
            >
              <Grid container item xs={12}>
                <Grid item xs={1} />
                {/* Category */}
                <Grid item xs={11}>
                  <Typography variant="h6">{category}</Typography>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                {housingQuestions
                  .filter((question) => question.category === category)
                  .map((question) => (
                    <Grid container item xs={12}>
                      <Grid item xs={1} />

                      {/* Question */}
                      <Grid item xs={5}>
                        <Typography variant="body1" gutterBottom>
                          {question.question_text}
                        </Typography>
                      </Grid>

                      <Grid item xs={1} />
                      
                      {/* Choices */}
                      <Grid item xs={5}>
                        {question.question_type === MULTIPLE_CHOICE ||
                          question.question_type === FILE
                          ?
                          // Multiple choice
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.choice?.join(", ")}
                          </Typography>
                          :
                          // Single choice
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.choice}
                          </Typography>
                        }
                      </Grid>
                    </Grid>))}
              </Grid>
            </Grid>))}
      </Grid>

      {/* Back and submit buttons */}
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleBack} style={{ marginRight: 8 }}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmation}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );

  const questionsBasedOnCategory = (
    <Grid container>
      <Grid container item xs={12} style={{ padding: 48 }}>
        {housingQuestions
          .filter(
            (question) =>
              question.category === housingCategories[currentCategory]
          )
          .map((question) => (
            <Grid item xs={12} key={question.id} style={{ marginBottom: 32 }}>
              {question.question_type === SINGLE_CHOICE
                ? <SingleChoiceQuestion question={question} />
                : question.question_type === MULTIPLE_CHOICE
                  ? <MultipleChoiceQuestion question={question} />
                  : question.question_type === TEXT
                    ? <TextQuestion
                      question={question}
                      formFields={formFields}
                      handleChange={handleChange}
                      currentCategory={currentCategory}
                    />
                    : question.question_type === SELECT
                      ? <SelectQuestion question={question} />
                      : <FileQuestion
                        question={question}
                        formFields={formFields}
                        handleCapture={handleCapture}
                        currentCategory={currentCategory}
                      />}
            </Grid>))}
      </Grid>

      {/* Back and next buttons */}
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleBack}
          disabled={currentCategory === 0}
          style={{ marginRight: 8 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!completed(currentCategory)}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );

  const confirmationDialog = (
    <Confirmation
      open={open}
      confirmationText={"Are you sure you want to submit?"}
      thankYouText={"Thank you for your submission!"}
      success={id ? editPostSuccess : createPostSuccess}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    />
  );

  return (
    <>
      {housingQuestions.length !== 0 && housingCategories.length !== 0 ? (
        <Paper className={classes.paper}>
          <span style={{ display: "flex", alignItems: "center"}}>
            <IconButton onClick={() => history.push("/housings")} style={{ marginRight: 5 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="textSecondary" display="inline">Back to all posts</Typography>
          </span>
          <br />
          <br />
          {stepper}

          <div>
            {currentCategory === housingCategories.length - 1
              ? summary
              : questionsBasedOnCategory}
          </div>

          {confirmationDialog}
        </Paper>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  roommateQuestions: state.form.roommateQuestions,
  roommateCategories: state.form.roommateCategories,
  housingQuestions: state.form.housingQuestions,
  housingCategories: state.form.housingCategories,
  profileQuestions: state.form.profileQuestions,
  profileCategories: state.form.profileCategories,
  createPostSuccess: state.post.createPostSuccess,
  editPostSuccess: state.post.editPostSuccess,
  userPost: state.post.userPost,
});

const mapDispatchToProps = {
  getQuestions,
  createPost,
  editPost,
  resetCreatePostSuccess,
  resetEditPostSuccess,
  getUserPosts,
  getPostList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HousingForm);
