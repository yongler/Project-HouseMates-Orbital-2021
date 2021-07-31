import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
  IconButton
} from "@material-ui/core";
import Confirmation from "../components/Confirmation";
import { getQuestions } from "../redux/form/actions";
import {
  getUserPosts,
  getPostList,
  createPost,
  editPost,
  resetCreatePostSuccess,
  resetEditPostSuccess,
  resetPostList,
  searchPost,
} from "../redux/post/actions";
import {
  ROOMMATE_FORM,
  MULTIPLE_CHOICE,
  SINGLE_CHOICE,
  TEXT,
  PRIORITY,
  SELF,
  OTHER,
  MY_COLUMN_ONLY,
  IS_10000,
} from "../globalConstants";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// RoommateForm consists of stepper, (((summary of roommateQuestions and user inputs) and (back and submit buttons)), or ((list of roommateQuestions with their corresponding list of choices based on category) and (back and next buttons))), dependent on current category. A confirmation dialog will popped up upon submission.

const TextQuestion = ({
  question,
  formFields,
  handleChange,
  currentCategory,
  PriorityComponent,
}) => (
  <>
    {/* Question */}
    <Typography variant="h6" color="textPrimary" gutterBottom>
      {question.question_text}
    </Typography>
    {question.my_column_only ? (
      // My choice only
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name={question.id}
          value={formFields[currentCategory]?.[question.id]?.myChoice}
          onChange={(e) => handleChange(e, currentCategory, MY_COLUMN_ONLY)}
        />
      </Grid>
    ) : (
      <Grid container item spacing={8}>
        {/* My choices */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel style={{ marginBottom: 10 }}>My choice(s):</FormLabel>
            <TextField
              variant="outlined"
              fullWidth
              name={question.id}
              value={formFields[currentCategory]?.[question.id]?.myChoice}
              onChange={(e) =>
                handleChange(e, currentCategory, SINGLE_CHOICE, SELF)
              }
            />
          </FormControl>
        </Grid>

        {/* Other choices */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel style={{ marginBottom: 10 }}>
              My ideal roommate's choice(s):
            </FormLabel>
            <TextField
              variant="outlined"
              fullWidth
              name={question.id}
              value={formFields[currentCategory]?.[question.id]?.otherChoice}
              onChange={(e) =>
                handleChange(e, currentCategory, SINGLE_CHOICE, OTHER)
              }
            />
          </FormControl>
        </Grid>

        {/* Priority */}
        <PriorityComponent question={question} />
      </Grid>
    )}
  </>
);

const RoommateForm = ({
  user,
  getQuestions,
  roommateQuestions,
  getPostList,
  posts,
  roommateCategories,
  createPost,
  createPostSuccess,
  resetCreatePostSuccess,
  editPost,
  editPostSuccess,
  resetEditPostSuccess,
  initialFormFields,
  id,
  resetPostList,
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
    return roommateQuestions
      .filter((question) => question.category === roommateCategories[category])
      .reduce(
        (prev, curr) =>
          prev &&
          (Array.isArray(formFields[category]?.[curr.id]?.myChoice)
            ? formFields[category]?.[curr.id]?.myChoice.length > 0
            : formFields[category]?.[curr.id]?.myChoice) &&
          (Array.isArray(formFields[category]?.[curr.id]?.otherChoice)
            ? formFields[category]?.[curr.id]?.otherChoice.length > 0
            : formFields[category]?.[curr.id]?.otherChoice) &&
          formFields[category]?.[curr.id]?.priority,
        true
      );
  };

  // Constants
  const priorityChoices = [
    "Irrelevant",
    "A little important",
    "Somewhat important",
    "Very important",
    "Mandatory",
  ];

  // States
  const [formFields, setFormFields] = useState({});
  const [currentCategory, setCurrentCategory] = useState(0);
  const [maxCategory, setMaxCategory] = useState(0);
  const [categoryCompleted, setCategoryCompleted] = useState({});
  const [open, setOpen] = useState(false);

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
  const handleStep = (category) => () =>
    category <= maxCategory ? setCurrentCategory(category) : null;

  // Form fields
  const handleChange = (e, category, type, selfOther) => {
    switch (type) {
      case SINGLE_CHOICE:
        switch (selfOther) {
          case SELF:
            setFormFields({
              ...formFields,
              [category]: {
                ...formFields[category],
                [e.target.name]: {
                  ...formFields[category]?.[e.target.name],
                  question: e.target.name,
                  myChoice: e.target.value,
                },
              },
            });
            break;
          case OTHER:
            setFormFields({
              ...formFields,
              [category]: {
                ...formFields[category],
                [e.target.name]: {
                  ...formFields[category]?.[e.target.name],
                  otherChoice: e.target.value,
                },
              },
            });
            break;
          default:
            break;
        }
        break;

      case MULTIPLE_CHOICE:
        switch (selfOther) {
          case SELF:
            var myChoice =
              formFields[category]?.[e.target.name]?.myChoice || [];
            if (myChoice?.includes(e.target.value)) {
              myChoice.splice(myChoice.indexOf(e.target.value), 1);
            } else {
              myChoice.push(e.target.value);
            }
            setFormFields({
              ...formFields,
              [category]: {
                ...formFields[category],
                [e.target.name]: {
                  ...formFields[category]?.[e.target.name],
                  question: e.target.name,
                  myChoice: myChoice,
                },
              },
            });
            break;

          case OTHER:
            var otherChoice =
              formFields[category]?.[e.target.name]?.otherChoice || [];
            if (otherChoice?.includes(e.target.value)) {
              otherChoice.splice(otherChoice.indexOf(e.target.value), 1);
            } else {
              otherChoice.push(e.target.value);
            }
            setFormFields({
              ...formFields,
              [category]: {
                ...formFields[category],
                [e.target.name]: {
                  ...formFields[category]?.[e.target.name],
                  otherChoice: otherChoice,
                },
              },
            });
            break;
          default:
            break;
        }
        break;

      case PRIORITY:
        setFormFields({
          ...formFields,
          [category]: {
            ...formFields[category],
            [e.target.name]: {
              ...formFields[category]?.[e.target.name],
              priority: e.target.value,
            },
          },
        });
        break;

      case MY_COLUMN_ONLY:
        setFormFields({
          ...formFields,
          [category]: {
            ...formFields[category],
            [e.target.name]: {
              ...formFields[category]?.[e.target.name],
              question: e.target.name,
              myChoice: e.target.value,
              otherChoice: e.target.value,
              priority: IS_10000,
            },
          },
        });
        break;

      default:
        break;
    }
  };

  // Confirmation dialog
  const handleConfirmation = () => {
    setOpen(true);
  };
  const handleCancel = () => setOpen(false);
  const handleSubmit = () => {
    const data = Object.values(formFields).map((category) =>
      Object.values(category)
    );
    const userObj = {
      first_name: user.first_name,
      last_name: user.last_name,
    };
    if (id) {
      editPost(id, ROOMMATE_FORM, data, userObj);
    } else {
      createPost(ROOMMATE_FORM, data, userObj);
    }
  };
  const handleClose = () => {
    resetCreatePostSuccess();
    resetEditPostSuccess();
    resetPostList();
    setOpen(false);
    if (posts.length > 0) {
      history.push("/matchmaking");
    } else {
      history.push("/roommates");
    }
  };

  // useEffects
  // Get roommate form questions
  useEffect(() => {
    if (roommateQuestions.length === 0) getQuestions(ROOMMATE_FORM);
  }, []);
  // Get roommate form categories
  useEffect(() => {
    getPostList(ROOMMATE_FORM);
  }, []);
  // Get existing roommate form data
  useEffect(() => {
    if (initialFormFields) {
      setFormFields(initialFormFields);
      const allCompleted = roommateCategories.reduce(
        (prev, curr, index) => ({ ...prev, [index]: true }),
        {}
      );
      setCategoryCompleted(allCompleted);
      setMaxCategory(roommateCategories.length);
    }
  }, [initialFormFields, roommateCategories]);

  // Components
  const SingleChoiceQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {question.question_text}
      </Typography>

      <Grid container spacing={8}>
        {/* My choices */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>My choice(s):</FormLabel>
            <RadioGroup
              name={question.id}
              value={formFields[currentCategory]?.[question.id]?.myChoice}
              onChange={(e) =>
                handleChange(e, currentCategory, SINGLE_CHOICE, SELF)
              }
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
        </Grid>

        {/* Other choices */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>My ideal roommate's choice(s):</FormLabel>
            <RadioGroup
              name={question.id}
              value={formFields[currentCategory]?.[question.id]?.otherChoice}
              onChange={(e) =>
                handleChange(e, currentCategory, SINGLE_CHOICE, OTHER)
              }
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
        </Grid>

        {/* Priority */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>Question priority:</FormLabel>
            <RadioGroup
              name={question.id}
              value={formFields[currentCategory]?.[question.id]?.priority}
              onChange={(e) => handleChange(e, currentCategory, PRIORITY)}
            >
              {priorityChoices.map((choice) => (
                <FormControlLabel
                  key={choice}
                  control={<Radio color="primary" />}
                  value={choice}
                  label={choice}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );

  const MultipleChoiceQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {question.question_text}
      </Typography>

      <Grid container item spacing={8}>
        {/* My choices */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>My choice(s):</FormLabel>
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
                  ]?.myChoice?.includes(choice)}
                  onChange={(e) =>
                    handleChange(e, currentCategory, MULTIPLE_CHOICE, SELF)
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>

        {/* Other choices */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>My ideal roommate's choice(s):</FormLabel>
            <FormGroup>
              {question.choice_set.map((choice) => (
                <FormControlLabel
                  name={question.id}
                  value={choice}
                  control={<Checkbox color="primary" />}
                  checked={formFields[currentCategory]?.[
                    question.id
                  ]?.otherChoice?.includes(choice)}
                  label={choice}
                  key={choice}
                  onChange={(e) =>
                    handleChange(e, currentCategory, MULTIPLE_CHOICE, OTHER)
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>

        {/* Priority */}
        <Grid item xs={4}>
          <FormControl>
            <FormLabel>Question priority:</FormLabel>
            <RadioGroup
              name={question.id}
              value={formFields[currentCategory]?.[question.id]?.priority}
              onChange={(e) => handleChange(e, currentCategory, PRIORITY)}
            >
              {priorityChoices.map((choice) => (
                <FormControlLabel
                  key={choice}
                  control={<Radio color="primary" />}
                  value={choice}
                  label={choice}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );

  const SelectQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {question.question_text}
      </Typography>

      {question.my_column_only ? (
        // My choice only
        <Grid item xs={12}>
          <Select
            variant="outlined"
            fullWidth
            name={question.id}
            value={formFields[currentCategory]?.[question.id]?.myChoice}
            onChange={(e) => handleChange(e, currentCategory, MY_COLUMN_ONLY)}
          >
            {question.choice_set.map((choice) => (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      ) : (
        <Grid container item spacing={8}>
          {/* My choices */}
          <Grid item xs={4}>
            <FormControl>
              <FormLabel style={{ marginBottom: 10 }}>My choice(s):</FormLabel>
              <Select
                variant="outlined"
                fullWidth
                name={question.id}
                value={formFields[currentCategory]?.[question.id]?.myChoice}
                onChange={(e) =>
                  handleChange(e, currentCategory, SINGLE_CHOICE, SELF)
                }
              >
                {question.choice_set.map((choice) => (
                  <MenuItem key={choice} value={choice}>
                    {choice}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Other choices */}
          <Grid item xs={4}>
            <FormControl>
              <FormLabel style={{ marginBottom: 10 }}>
                My ideal roommate's choice(s):
              </FormLabel>
              <Select
                variant="outlined"
                fullWidth
                name={question.id}
                value={formFields[currentCategory]?.[question.id]?.otherChoice}
                onChange={(e) =>
                  handleChange(e, currentCategory, SINGLE_CHOICE, OTHER)
                }
              >
                {question.choice_set.map((choice) => (
                  <MenuItem key={choice} value={choice}>
                    {choice}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Priority */}
          <Grid item xs={4}>
            <FormControl>
              <FormLabel>Question priority:</FormLabel>
              <RadioGroup
                name={question.id}
                value={formFields[currentCategory]?.[question.id]?.priority}
                onChange={(e) => handleChange(e, currentCategory, PRIORITY)}
              >
                {priorityChoices.map((choice) => (
                  <FormControlLabel
                    key={choice}
                    control={<Radio color="primary" />}
                    value={choice}
                    label={choice}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      )}
    </>
  );

  const Priority = ({ question }) => (
    <Grid item xs={4}>
      <FormControl>
        <FormLabel>Question priority:</FormLabel>
        <RadioGroup
          name={question.id}
          value={formFields[currentCategory]?.[question.id]?.priority}
          onChange={(e) => handleChange(e, currentCategory, PRIORITY)}
        >
          {priorityChoices.map((choice) => (
            <FormControlLabel
              key={choice}
              control={<Radio color="primary" />}
              value={choice}
              label={choice}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  );

  const stepper = (
    <Stepper nonLinear alternativeLabel activeStep={currentCategory}>
      {roommateCategories.map((category, index) => (
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
        {roommateCategories
          .filter((category) => category !== "Confirmation")
          .map((category, categoryIndex) => (
            <Grid item xs={12} key={category} style={{ marginBottom: 32 }}>
              <Grid container>
                {/* Category */}
                <Grid item xs={3}>
                  <Typography variant="h6">{category}</Typography>
                </Grid>
                {/* My choice */}
                <Grid item xs={3}>
                  <Typography variant="body1" color="textSecondary">
                    My choice(s):
                  </Typography>
                </Grid>
                {/* Other choice */}
                <Grid item xs={3}>
                  <Typography variant="body1" color="textSecondary">
                    My ideal roommate's choice(s):
                  </Typography>
                </Grid>
                {/* Priority */}
                <Grid item xs={3}>
                  <Typography variant="body1" color="textSecondary">
                    Question priority:
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                {roommateQuestions
                  .filter((question) => question.category === category)
                  .map((question) => (
                    <Grid container item xs={12} spacing={8}>
                      {/* Question */}
                      <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                          {question.question_text}
                        </Typography>
                      </Grid>
                      {/* My choices */}
                      <Grid item xs={3}>
                        {question.my_column_only ? (
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.myChoice}
                          </Typography>
                        ) : question.question_type === MULTIPLE_CHOICE ? (
                          // Multiple choice
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[
                              question.id
                            ]?.myChoice?.reduce(
                              (prev, curr) =>
                                (prev ? prev + ", " : prev) + curr,
                              ""
                            )}
                          </Typography>
                        ) : (
                          // Single choice
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.myChoice}
                          </Typography>
                        )}
                      </Grid>
                      {/* Other choices */}
                      <Grid item xs={3}>
                        {question.my_column_only ? null : question.question_type ===
                          MULTIPLE_CHOICE ? (
                          // Multiple choice
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[
                              question.id
                            ]?.otherChoice?.reduce(
                              (prev, curr) =>
                                (prev ? prev + ", " : prev) + curr,
                              ""
                            )}
                          </Typography>
                        ) : (
                          // Single choice
                          <Typography variant="body1" gutterBottom>
                            {
                              formFields[categoryIndex]?.[question.id]
                                ?.otherChoice
                            }
                          </Typography>
                        )}
                      </Grid>
                      {/* Priority */}
                      <Grid item xs={3}>
                        {question.my_column_only ? null : (
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.priority}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
      </Grid>

      {/* Back and submit buttons */}
      {
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
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
      }
    </Grid>
  );

  const questionsBasedOnCategory = (
    <Grid container>
      <Grid container item xs={12} style={{ padding: 48 }}>
        {roommateQuestions
          .filter(
            (question) =>
              question.category === roommateCategories[currentCategory]
          )
          .map((question) => (
            <Grid item xs={12} style={{ marginBottom: 32 }}>
              {question.question_type === SINGLE_CHOICE ? (
                <SingleChoiceQuestion question={question} />
              ) : question.question_type === MULTIPLE_CHOICE ? (
                <MultipleChoiceQuestion question={question} />
              ) : question.question_type === TEXT ? (
                <TextQuestion
                  question={question}
                  formFields={formFields}
                  handleChange={handleChange}
                  currentCategory={currentCategory}
                  PriorityComponent={Priority}
                />
              ) : (
                <SelectQuestion question={question} />
              )}
            </Grid>
          ))}
      </Grid>

      {/* Back and next buttons */}
      {
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
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
      }
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
      {roommateQuestions.length !== 0 && roommateCategories.length !== 0 ? (
        <Paper className={classes.paper}>
          <IconButton onClick={() => history.push("/roommates")}>
            <ArrowBackIcon />Back to all posts
          </IconButton>
          <br />
          <br />
          {stepper}

          <div>
            {currentCategory === roommateCategories.length - 1
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
  posts: state.post.posts,
  roommateCategories: state.form.roommateCategories,
  createPostSuccess: state.post.createPostSuccess,
  editPostSuccess: state.post.editPostSuccess,
});

const mapDispatchToProps = {
  getQuestions,
  createPost,
  editPost,
  resetCreatePostSuccess,
  resetEditPostSuccess,
  getUserPosts,
  getPostList,
  resetPostList,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoommateForm);
