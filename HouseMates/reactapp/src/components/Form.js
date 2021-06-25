import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, Slider, Step, StepButton, Stepper, TextField, Typography } from '@material-ui/core'
import Confirmation from './Confirmation'
import { getQuestions } from '../redux/form/actions'
import { createPost, editPost, resetCreatePostSuccess, resetEditPostSuccess } from '../redux/post/actions'
import { ROOMMATE_FORM, HOUSING_FORM, PROFILE_FORM, MULTIPLE_CHOICE, SINGLE_CHOICE, PRIORITY, SELF, OTHER } from '../globalConstants'

// Form consists of stepper, (((summary of questions and user inputs) and (back and submit buttons)), or ((list of questions with their corresponding list of choices based on category) and (back and next buttons))), dependent on current category. A confirmation dialog will popped up upon submission.
const Form = ({
  user,
  getQuestions,
  roommateQuestions, roommateCategories,
  housingQuestions, housingCategories,
  profileQuestions, profileCategories,
  createPostSuccess, editPostSuccess,
  createPost, resetCreatePostSuccess,
  editPost, resetEditPostSuccess,
  formType, initialFormFields, id,
}) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    backButton: {
      marginRight: theme.spacing(1),
    },
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
    return questions
      .filter(question => question.category === categories[category])
      .reduce((prev, curr) => prev && formFields[category]?.[curr.id]?.myChoice && formFields[category]?.[curr.id]?.otherChoice && formFields[category]?.[curr.id]?.priority, true)
  }

  // Constants
  const priorityChoices = ["Irrelevant", "A little important", "Somewhat important", "Very important", "Mandatory"]

  // States
  const [formFields, setFormFields] = useState({})
  const [currentCategory, setCurrentCategory] = useState(0)
  const [maxCategory, setMaxCategory] = useState(0)
  const [categoryCompleted, setCategoryCompleted] = useState({})
  const [open, setOpen] = useState(false)
  const [questions, setQuestions] = useState([])
  const [categories, setCategories] = useState([])

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
              }
            })
            break
          case OTHER:
            setFormFields({
              ...formFields,
              [category]: {
                ...formFields[category],
                [e.target.name]: {
                  ...formFields[category]?.[e.target.name],
                  otherChoice: e.target.value,
                },
              }
            })
            break
          default:
            break
        }
        break

      case MULTIPLE_CHOICE:
        switch (selfOther) {
          case SELF:
            var myChoice = formFields[category]?.[e.target.name]?.myChoice || []
            if (myChoice?.includes(e.target.value)) {
              myChoice.splice(myChoice.indexOf(e.target.value), 1)
            } else {
              myChoice.push(e.target.value)
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
              }
            })
            break

          case OTHER:
            var otherChoice = formFields[category]?.[e.target.name]?.otherChoice || []
            if (otherChoice?.includes(e.target.value)) {
              otherChoice.splice(otherChoice.indexOf(e.target.value), 1)
            } else {
              otherChoice.push(e.target.value)
            }
            setFormFields({
              ...formFields,
              [category]: {
                ...formFields[category],
                [e.target.name]: {
                  ...formFields[category]?.[e.target.name],
                  otherChoice: otherChoice,
                },
              }
            })
            break
          default:
            break
        }
        break

      case PRIORITY:
        setFormFields({
          ...formFields,
          [category]: {
            ...formFields[category],
            [e.target.name]: {
              ...formFields[category]?.[e.target.name],
              priority: e.target.value,
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
    history.push('/roommates')
  }

  // componentDidMount
  useEffect(() => {
    if (formType === ROOMMATE_FORM && roommateQuestions.length === 0 ||
      formType === HOUSING_FORM && housingQuestions.length === 0 ||
      formType === PROFILE_FORM && profileQuestions.length === 0
    ) {
      getQuestions(formType)
    } else {
      if (formType === ROOMMATE_FORM) {
        setQuestions(roommateQuestions)
        setCategories(roommateCategories)
      } else if (formType === HOUSING_FORM) {
        setQuestions(housingQuestions)
        setCategories(housingCategories)
      } else {
        setQuestions(profileQuestions)
        setCategories(profileCategories)
      }
    }
  }, [])

  useEffect(() => {
    setQuestions(roommateQuestions)
    setCategories(roommateCategories)
  }, [roommateQuestions, formType === ROOMMATE_FORM ? questions : null])
  useEffect(() => {
    setQuestions(housingQuestions)
    setCategories(housingCategories)
  }, [housingQuestions, formType === HOUSING_FORM ? questions : null])
  useEffect(() => {
    setQuestions(profileQuestions)
    setCategories(profileCategories)
  }, [profileQuestions, formType === PROFILE_FORM ? questions : null])

  useEffect(() => {
    if (initialFormFields) {
      setFormFields(initialFormFields)
      const allCompleted = categories
        .reduce((prev, curr, index) => ({ ...prev, [index]: true }), {})
      setCategoryCompleted(allCompleted)
      setMaxCategory(categories.length)
    }
  }, [initialFormFields, categories])

  // Components
  const SingleChoiceQuestion = ({ question }) => {
    return (
      <FormControl style={{ width: "100%" }}>
        {/* Question */}
        <FormLabel>
          <Typography variant="h6" color="textPrimary">{question.question_text}</Typography>
        </FormLabel>

        <Grid container spacing={2}>
          {/* My choices */}
          <Grid item xs={4}>
            <RadioGroup
              onChange={e => handleChange(e, currentCategory, SINGLE_CHOICE, SELF)}
              value={formFields[currentCategory]?.[question.id]?.myChoice}
              name={question.id}
            >
              {question.choice_set.map(choice => (
                <FormControlLabel
                  value={choice}
                  control={<Radio color="primary" />}
                  label={choice}
                  key={choice}
                />
              ))}
            </RadioGroup>
          </Grid>

          {/* Other choices */}
          <Grid item xs={4}>
            <RadioGroup
              onChange={e => handleChange(e, currentCategory, SINGLE_CHOICE, OTHER)}
              value={formFields[currentCategory]?.[question.id]?.otherChoice}
              name={question.id}
            >
              {question.choice_set.map(choice => (
                <FormControlLabel
                  value={choice}
                  control={<Radio color="primary" />}
                  label={choice}
                  key={choice}
                />
              ))}
            </RadioGroup>
          </Grid>

          {/* Priority */}
          <Grid item xs={4}>
            <RadioGroup
              onChange={e => handleChange(e, currentCategory, PRIORITY)}
              value={formFields[currentCategory]?.[question.id]?.priority}
              name={question.id}
            >
              {priorityChoices.map(choice => (
                <FormControlLabel
                  value={choice}
                  control={<Radio color="primary" />}
                  label={choice}
                  key={choice}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
      </FormControl>
    )
  }

  const MultipleChoiceQuestion = ({ question }) => {
    return (
      <FormControl style={{ width: '100%'}}>
        {/* Question */}
        <FormLabel>
          <Typography variant="h6" color="textPrimary">{question.question_text}</Typography>
        </FormLabel>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* My choices */}
            <FormGroup>
              {question.choice_set.map(choice => (
                <FormControlLabel
                  name={question.id}
                  value={choice}
                  control={<Checkbox color="primary" />}
                  checked={formFields[currentCategory]?.[question.id]?.myChoice?.includes(choice)}
                  label={choice}
                  key={choice}
                  onChange={e => handleChange(e, currentCategory, MULTIPLE_CHOICE, SELF)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Other choices */}
          <Grid item xs={4}>
            <FormGroup>
              {question.choice_set.map(choice => (
                <FormControlLabel
                  name={question.id}
                  value={choice}
                  control={<Checkbox color="primary" />}
                  checked={formFields[currentCategory]?.[question.id]?.otherChoice?.includes(choice)}
                  label={choice}
                  key={choice}
                  onChange={e => handleChange(e, currentCategory, MULTIPLE_CHOICE, OTHER)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Priority */}
          <Grid item xs={4}>
            <RadioGroup
              onChange={e => handleChange(e, currentCategory, PRIORITY)}
              value={formFields[currentCategory]?.[question.id]?.priority}
              name={question.id}
            >
              {priorityChoices.map(choice => (
                <FormControlLabel
                  value={choice}
                  control={<Radio color="primary" />}
                  label={choice}
                  key={choice}
                />
              ))}
            </RadioGroup>
          </Grid>
        </Grid>

      </FormControl>
    )
  }

  const TextQuestion = ({ question }) => {
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label={question.question_text}
      name={question.question_text}
      onChange={e => handleChange(e)}
    />
  }

  const stepper =
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

  const summary =
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories
          .filter(category => category !== "Confirmation")
          .map((category, categoryIndex) => (
            <div style={{ display: 'flex', flexDirection: 'column' }} className={classes.category} key={category}>
              {/* Category */}
              <div><Typography variant="h6">{category}</Typography></div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {questions
                  .filter(question => question.category === category)
                  .map(question => (
                    <Grid container style={{ width: "100%"}}>
                      {/* Question */}
                      <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>{question.question_text}</Typography>
                      </Grid>

                      {/* My choices */}
                      <Grid item xs={3}>
                        {question.question_type === MULTIPLE_CHOICE
                          ?
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.myChoice?.reduce((prev, curr) => (prev ? prev + ", " : prev) + curr, '')}
                          </Typography>
                          :
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.myChoice}
                          </Typography>
                        }
                      </Grid>
                      {/* Other choices */}
                      <Grid item xs={3}>
                        {question.question_type === MULTIPLE_CHOICE
                          ?
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.otherChoice?.reduce((prev, curr) => (prev ? prev + ", " : prev) + curr, '')}
                          </Typography>
                          :
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex]?.[question.id]?.otherChoice}
                          </Typography>
                        }
                      </Grid>
                      {/* Priority */}
                      <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                          {formFields[categoryIndex]?.[question.id]?.priority}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {/* Back and submit buttons */}
      {
        <Box mt={10}>
          <Button
            className={classes.backButton}
            onClick={handleBack}
            type="button"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleConfirmation}
          >
            Submit
          </Button>
        </Box>
      }
    </div>

  const questionsBasedOnCategory =
    <Box>
      <div>
        {questions
          .filter(question => question.category === categories[currentCategory])
          .map(question => (
            <Box mt={5} key={question.id} style={{ width: '100%' }}>
              {question.question_type === SINGLE_CHOICE
                ?
                <SingleChoiceQuestion question={question} />
                :
                question.question_type === MULTIPLE_CHOICE
                  ?
                  <MultipleChoiceQuestion question={question} />
                  :
                  <TextQuestion question={question} />
              }
            </Box>
          ))}
      </div>

      {/* Back and next buttons */}
      {
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
      }
    </Box>

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
      {questions.length !== 0 && categories.length !== 0
        ?
        <Paper className={classes.paper}>
          {stepper}

          <div>
            {currentCategory === categories.length - 1 ? summary : questionsBasedOnCategory}
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
})

const mapDispatchToProps = {
  getQuestions,
  createPost,
  editPost,
  resetCreatePostSuccess,
  resetEditPostSuccess,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)