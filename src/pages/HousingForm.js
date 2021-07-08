import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Step, StepButton, Stepper, TextField, Typography } from '@material-ui/core'
import Confirmation from '../components/Confirmation'
import { getQuestions } from '../redux/form/actions'
import { getUserPost, getPostList, createPost, editPost, resetCreatePostSuccess, resetEditPostSuccess } from '../redux/post/actions'
import { ROOMMATE_FORM, HOUSING_FORM, PROFILE_FORM, MULTIPLE_CHOICE, SINGLE_CHOICE, TEXT } from '../globalConstants'

// HousingForm consists of stepper, (((summary of questions and user inputs) and (back and submit buttons)), or ((list of questions with their corresponding list of choices based on category) and (back and next buttons))), dependent on current category. A confirmation dialog will popped up upon submission.

const TextQuestion = ({ question, formFields, handleChange, currentCategory }) => (
  <>
    {/* Question */}
    <Typography variant="h6" color="textPrimary">{question.question_text}</Typography>

    {/* Input */}
    <TextField
      // autoFocus
      variant="outlined"
      margin="normal"
      fullWidth
      name={question.id}
      value={formFields[currentCategory]?.[question.id]?.choice}
      onChange={e => handleChange(e, currentCategory, SINGLE_CHOICE)}
    />
  </>
)

const HousingForm = ({
  user,
  getQuestions,
  housingQuestions, housingCategories,
  createPostSuccess, editPostSuccess,
  createPost, resetCreatePostSuccess,
  editPost, resetEditPostSuccess,
  formType, initialFormFields, id,
  getUserPost, getPostList,
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    category: {
      marginBottom: 10,
    },
    active: {
      background: theme.palette.action.hover,
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // Helper functions
  const completed = category => {
    return housingQuestions
      .filter(question => question.category === housingCategories[category])
      .reduce((prev, curr) => prev && formFields[category]?.[curr.id]?.choice, true)
  }

  // States
  const [formFields, setFormFields] = useState({})
  const [currentCategory, setCurrentCategory] = useState(0)
  const [maxCategory, setMaxCategory] = useState(0)
  const [categoryCompleted, setCategoryCompleted] = useState({})
  const [open, setOpen] = useState(false)

  // Handlers
  const handleNext = () => {
    window.scrollTo(0, 0)
    setCurrentCategory((prev) => prev + 1)
    setMaxCategory((prev) =>
      currentCategory >= maxCategory ? prev + 1 : prev
    )
    const newCategoryCompleted = categoryCompleted
    newCategoryCompleted[currentCategory] = true
    setCategoryCompleted(newCategoryCompleted)
  }
  const handleBack = () => {
    window.scrollTo(0, 0)
    setCurrentCategory((prev) => prev - 1)
  }
  const handleStep = (category) => () =>
    category <= maxCategory ? setCurrentCategory(category) : null

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
          }
        })
        break

      case MULTIPLE_CHOICE:
        var choice = formFields[category]?.[e.target.name]?.choice || []
        if (choice?.includes(e.target.value)) {
          choice.splice(choice.indexOf(e.target.value), 1)
        } else {
          choice.push(e.target.value)
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
          }
        })
        break

      default:
        break
    }
  }

  const handleConfirmation = () => { setOpen(true) }
  const handleCancel = () => setOpen(false)
  const handleSubmit = () => {
    const data = Object.values(formFields).map(category => Object.values(category))
    const userObj = {
      first_name: user.first_name,
      last_name: user.last_name,
    }
    if (id) { editPost(id, formType, data, userObj) } else { createPost(formType, data, userObj) }
  }
  const handleClose = () => {
    resetCreatePostSuccess()
    resetEditPostSuccess()
    setOpen(false)
    history.push('/matchmaking')
  }

  // componentDidMount
  useEffect(() => {
    if (housingQuestions.length === 0) getQuestions(HOUSING_FORM)
  }, [])
  useEffect(() => {
    if (initialFormFields) {
      setFormFields(initialFormFields)
      const allCompleted = housingCategories
        .reduce((prev, curr, index) => ({ ...prev, [index]: true }), {})
      setCategoryCompleted(allCompleted)
      setMaxCategory(housingCategories.length)
    }
  }, [initialFormFields, housingCategories])
  useEffect(() => { getPostList(ROOMMATE_FORM) }, [])
  useEffect(() => user ? getUserPost(user.id) : null, [user])

  // Components
  const SingleChoiceQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary" gutterBottom>{question.question_text}</Typography>

      {/* Choices */}
      <FormControl>
        <RadioGroup
          name={question.id}
          value={formFields[currentCategory]?.[question.id]?.choice}
          onChange={e => handleChange(e, currentCategory, SINGLE_CHOICE)}
        >
          {question.choice_set.map(choice => (
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
  )

  const MultipleChoiceQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary" gutterBottom>{question.question_text}</Typography>

      {/* Choices */}
      <FormControl>
        <FormGroup>
          {question.choice_set.map(choice => (
            <FormControlLabel
              key={choice}
              control={<Checkbox color="primary" />}
              name={question.id}
              value={choice}
              label={choice}
              checked={formFields[currentCategory]?.[question.id]?.choice?.includes(choice)}
              onChange={e => handleChange(e, currentCategory, MULTIPLE_CHOICE)}
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  )

  const SelectQuestion = ({ question }) => (
    <>
      {/* Question */}
      <Typography variant="h6" color="textPrimary">{question.question_text}</Typography>

      {console.log(formFields)}

      {/* Choices */}
      <FormControl variant="outlined" fullWidth>
        <Select
          name={question.id}
          value={formFields[currentCategory]?.[question.id]?.choice}
          onChange={e => handleChange(e, currentCategory, SINGLE_CHOICE)}
        >
          {question.choice_set.map(choice => (
            <MenuItem key={choice} value={choice}>{choice}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )

  const stepper =
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

  const summary =
    <Grid container>
      <Grid container item xs={12} style={{ padding: 48 }}>
        {housingCategories
          .filter(category => category !== "Confirmation")
          .map((category, categoryIndex) => (
            // Category
            <Grid item xs={12} key={category} style={{ marginBottom: 32 }}>
              <Grid container>
                <Grid item xs={3} />
                <Grid item xs={9}>
                  <Typography variant="h6">{category}</Typography>
                </Grid>
              </Grid>

              <Grid container>
                {housingQuestions
                  .filter(question => question.category === category)
                  .map(question => (
                    <Grid container item xs={12} spacing={8}>
                      {/* Question */}
                      <Grid item xs={3} />
                      <Grid item xs={4}>
                        <Typography variant="body1" gutterBottom>{question.question_text}</Typography>
                      </Grid>
                      {/* Choices */}
                      <Grid item xs={4}>
                        {question.question_type === MULTIPLE_CHOICE
                          ?
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.choice?.reduce((prev, curr) => (prev ? prev + ", " : prev) + curr, '')}
                          </Typography>
                          :
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.choice}
                          </Typography>
                        }
                      </Grid>
                      <Grid item xs={1} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
      </Grid>

      {/* Back and submit buttons */}
      < Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleBack}
          style={{ marginRight: 8 }}
        >
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

  const questionsBasedOnCategory =
    <Grid container>
      <Grid container item xs={12} style={{ padding: 48 }}>
        {housingQuestions
          .filter(question => question.category === housingCategories[currentCategory])
          .map(question => (
            <Grid item xs={12} key={question.id} style={{ marginBottom: 32 }}>
              {question.question_type === SINGLE_CHOICE
                ? <SingleChoiceQuestion question={question} />
                : question.question_type === MULTIPLE_CHOICE
                  ? <MultipleChoiceQuestion question={question} />
                  : question.question_type === TEXT
                    ? <TextQuestion question={question} formFields={formFields} handleChange={handleChange} currentCategory={currentCategory} />
                    : <SelectQuestion question={question} />}
            </Grid>))}
      </Grid>

      {/* Back and next buttons */}
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
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

  const confirmationDialog =
    <Confirmation
      open={open}
      confirmationText={"Are you sure you want to submit?"}
      thankYouText={"Thank you for your submission!"}
      success={id ? editPostSuccess : createPostSuccess}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    />

  return (
    <>
      {housingQuestions.length !== 0 && housingCategories.length !== 0
        ?
        <Paper className={classes.paper}>
          {stepper}

          <div>
            {currentCategory === housingCategories.length - 1 ? summary : questionsBasedOnCategory}
          </div>

          {confirmationDialog}
        </Paper>
        :
        null}
    </>
  )
}

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
  posts: state.post.posts,
})

const mapDispatchToProps = {
  getQuestions,
  createPost,
  editPost,
  resetCreatePostSuccess,
  resetEditPostSuccess,
  getUserPost,
  getPostList,
}

export default connect(mapStateToProps, mapDispatchToProps)(HousingForm)