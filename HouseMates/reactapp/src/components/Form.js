import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, Step, StepButton, Stepper, TextField, Typography } from '@material-ui/core'
import Confirmation from './Confirmation'
import { getQuestions } from '../redux/form/actions'
import { createPost, editPost, resetCreatePostSuccess, resetEditPostSuccess } from '../redux/post/actions'

// Form consists of stepper, (((summary of questions and user inputs) and (back and submit buttons)), or ((list of questions with their corresponding list of choices based on category) and (back and next buttons))), dependent on current category. A confirmation dialog will popped up upon submission.
const Form = ({
  isAuthenticated, user,
  roommateQuestions, roommateCategories,
  housingQuestions, housingCategories,
  profileQuestions, profileCategories,
  createPostSuccess, editPostSuccess,
  getQuestions,
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
      .reduce((prev, curr) => prev && formFields[category] && formFields[category][curr.id], true)
  }

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
  const handleBack = () => setCurrentCategory((prev) => prev - 1)
  const handleStep = (category) => () =>
    category <= maxCategory ? setCurrentCategory(category) : null

  const handleChange = (e, category, questionText) => {
    setFormFields({
      ...formFields,
      [category]: {
        ...formFields[category],
        [e.target.name]: {
          question: e.target.name,
          choice: e.target.value,
        },
      }
    })
  }
  const handleMultipleChange = (e, category, questionText) => {
    const name = e.target.name
    const newValue = e.target.value
    var value = formFields[category] && formFields[category][name] ? formFields[category][name].choice : []
    if (value && value.includes(newValue)) {
      value.splice(value.indexOf(newValue), 1)
    } else {
      value.push(newValue)
    }
    setFormFields({
      ...formFields,
      [category]: {
        ...formFields[category],
        [e.target.name]: {
          question: e.target.name,
          choice: value,
        },
      }
    })
  }

  const handleConfirmation = () => setOpen(true)
  const handleCancel = () => setOpen(false)
  const handleSubmit = () => {
    const data = Object.values(formFields).map(category => Object.values(category))
    if (id) { editPost(id, formType, data, user.id) } else { createPost(formType, data, user.id) }
  }
  const handleClose = () => {
    resetCreatePostSuccess()
    resetEditPostSuccess()
    setOpen(false)
    history.push('/roommates')
  }

  // componentDidMount
  useEffect(() => {
    window.scrollTo(0, 0)

    if (formType === 1 && roommateQuestions.length === 0 ||
      formType === 2 && housingQuestions.length === 0 ||
      formType === 3 && profileQuestions.length === 0
    ) {
      getQuestions(formType)
    } else {
      if (formType === 1) {
        setQuestions(roommateQuestions)
        setCategories(roommateCategories)
      } else if (formType === 2) {
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
  }, [roommateQuestions, formType === 1 ? questions : null])
  useEffect(() => {
    setQuestions(housingQuestions)
    setCategories(housingCategories)
  }, [housingQuestions, formType === 2 ? questions : null])
  useEffect(() => {
    setQuestions(profileQuestions)
    setCategories(profileCategories)
  }, [profileQuestions, formType === 3 ? questions : null])

  useEffect(() => {
    if (initialFormFields) setFormFields(initialFormFields)
  }, [initialFormFields])

  // Components
  const SingleChoiceQuestion = ({ question }) => {
    return (
      <FormControl >
        {/* Question */}
        < FormLabel >
          <Typography variant="h6" color="textPrimary">{question.question_text}</Typography>
        </FormLabel >

        {/* List of choices */}
        < RadioGroup
          onChange={e => handleChange(e, currentCategory, question.question_text)}
          value={
            formFields[currentCategory] && formFields[currentCategory][question.id]
              ? formFields[currentCategory][question.id].choice
              : null
          }
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
        </RadioGroup >
      </FormControl >
    )
  }

  const MultipleChoiceQuestion = ({ question }) => {
    return (
      <FormControl>
        {/* Question */}
        <FormLabel>
          <Typography variant="h6" color="textPrimary">{question.question_text}</Typography>
        </FormLabel>

        {/* List of choices */}
        <FormGroup>
          {question.choice_set.map(choice => (
            <FormControlLabel
              name={question.id}
              value={choice}
              control={<Checkbox color="primary" />}
              checked={
                formFields[currentCategory] &&
                  formFields[currentCategory][question.id] &&
                  formFields[currentCategory][question.id].choice
                  ? formFields[currentCategory][question.id].choice.includes(choice)
                  : false
              }
              label={choice}
              key={choice}
              onChange={e => handleMultipleChange(e, currentCategory, question.question_text)}
            />
          ))}
        </FormGroup>
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
                    <Grid container>
                      {/* Question */}
                      <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>{question.question_text}</Typography>
                      </Grid>

                      {/* User input */}
                      <Grid item xs={6}>
                        {question.question_type === "Multiple choice"
                          ?
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex] &&
                              formFields[categoryIndex][question.id] &&
                              formFields[categoryIndex][question.id].choice
                              ? formFields[categoryIndex][question.id].choice
                                .reduce((prev, curr) => (prev ? prev + ", " : prev) + curr, '')
                              : null}
                          </Typography>
                          :
                          <Typography variant="body1" gutterBottom>
                            {formFields[categoryIndex] && formFields[categoryIndex][question.id]
                              ? formFields[categoryIndex][question.id].choice
                              : null}
                          </Typography>
                        }
                      </Grid>
                    </Grid>
                  ))}
              </div>
            </div>
          ))}
      </div>

      {/* Back and submit buttons */}
      {
        // !loading &&
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
      }
    </div>

  const questionsBasedOnCategory =
    <Box className={classes.flex}>
      <div>
        {questions
          .filter(question => question.category === categories[currentCategory])
          .map(question => (
            <Box mt={5} key={question.id}>
              {question.question_type === "SingleChoice"
                ?
                <SingleChoiceQuestion question={question} />
                :
                // questions.question_type === "Multiple choice"
                // ?
                <MultipleChoiceQuestion question={question} />
                // :
                // <TextQuestion question={question} />
              }
            </Box>
          ))}
      </div>

      {/* Back and next buttons */}
      {
        // !loading &&
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