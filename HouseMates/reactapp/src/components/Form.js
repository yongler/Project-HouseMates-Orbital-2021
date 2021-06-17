import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, Step, StepButton, Stepper, TextField, Typography } from '@material-ui/core'
import Confirmation from './Confirmation'
import { getQuestions } from '../redux/form/actions'

// Form consists of stepper, (((summary of questions and user inputs) and (back and submit buttons)), or ((list of questions with their corresponding list of choices based on category) and (back and next buttons))), dependent on current category. A confirmation dialog will popped up upon submission.
const Form = ({ categories, questions, getQuestions, formType }) => {
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

  // Data (hard coded for now)
  // const categories = [
  //   'Personality',
  //   'Work/Study',
  //   'Interests',
  //   'Habits',
  //   'Room Preferences',
  //   'Confirmation',
  // ]
  // const questionList = [
  //   {
  //     id: 1,
  //     question: 'Age',
  //     choices: ['20s', '30s', '40s'],
  //     category: 'Personality',
  //   },
  //   {
  //     id: 2,
  //     question: 'Nationality',
  //     choices: ['Malaysian', 'Singaporean', 'Others'],
  //     category: 'Work/Study',
  //   },
  //   {
  //     id: 3,
  //     question: 'Cat or Dog',
  //     choices: ['Cat person', 'Dog person'],
  //     category: 'Interests',
  //   },
  //   {
  //     id: 4,
  //     question: 'Smoker',
  //     choices: ['Yes', 'No'],
  //     category: 'Habits',
  //   },
  //   {
  //     id: 5,
  //     question: 'Working shift',
  //     choices: ['Morning', 'Night'],
  //     category: 'Room Preferences',
  //   },
  //   {
  //     id: 6,
  //     question: 'Alcoholic',
  //     choices: ['Yes', 'No'],
  //     category: 'Habits',
  //   },
  // ]

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // Helper functions
  const completed = category => {
    return questions
      .filter(question => question.category === categories[category])
      .reduce((prev, curr) => prev && formFields[curr.question_text] !== '', true)
  }

  // States
  const [formFields, setFormFields] = useState({})
  const [currentCategory, setCurrentCategory] = useState(0)
  const [maxCategory, setMaxCategory] = useState(0)
  const [categoryCompleted, setCategoryCompleted] = useState({})
  const [open, setOpen] = useState(false)
  // const [age, setAge] = useState('')
  // const [nationality, setNationality] = useState('')
  // const [catDog, setCatDog] = useState('')
  // const [smoker, setSmoker] = useState('')
  // const [workingShift, setWorkingShift] = useState('')
  // const [alcoholic, setAlcoholic] = useState('')
  // const variables = [age, nationality, catDog, smoker, workingShift, alcoholic]
  // const functions = [
  //   setAge,
  //   setNationality,
  //   setCatDog,
  //   setSmoker,
  //   setWorkingShift,
  //   setAlcoholic,
  // ]

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

  // const handleChange = (input) => (e) => functions[input](e.target.value)
  const handleChange = e => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    })
  }




  const handleConfirmation = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleRedirect = () => {
    setOpen(false)
    history.push('/roommates')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getQuestions(formType)
  }, [])

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
          onChange={e => handleChange(e)}
          value={formFields[question.question_text]}
        >
          {question.choices.map(choice => (
            <FormControlLabel
              value={choice.choice_text}
              control={<Radio color="primary" />}
              label={choice.choice_text}
              key={choice.id}
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
        <FormGroup
          onChange={e => handleChange(e)}
          value={formFields[question.question_text]}
        >
          {question.choices.map(choice => (
            <FormControlLabel
              value={choice.choice_text}
              control={<Checkbox color="primary" />}
              label={choice.choice_text}
              key={choice.id}
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
    <Box mt={5} className={classes.flex}>
      <Grid container spacing={2}>
        {categories
          .filter(category => category !== "Confirmation")
          .map(category => (
            <Grid container className={classes.category} key={category}>
              {/* Category */}
              <Grid item xs={12}>
                <Typography variant="h6">{category}</Typography>
              </Grid>

              <Grid container item xs={12}>
                {questions
                  .filter(question => question.category === category)
                  .map(question => (
                    <Grid container item xs={12} key={question.id}>
                      {/* Question */}
                      <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                          {question.question_text}
                        </Typography>
                      </Grid>

                      {/* User input */}
                      <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>
                          {/* {variables[question.id - 1]} */}
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

  const questionsBasedOnCategory =
    <Box className={classes.flex}>
      {questions
        .filter(question => question.category === categories[currentCategory])
        .map(question => (
          <Box mt={5} key={question.id}>
            {question.question_type === "Single choice"
              ?
              <SingleChoiceQuestion question={question} />
              :
              questions.question_type === "Multiple choice"
                ?
                <MultipleChoiceQuestion question={question} />
                :
                <TextQuestion question={question} />
            }
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

  const confirmationDialog =
    <Confirmation
      open={open}
      handleClose={handleClose}
      handleRedirect={handleRedirect}
    />

  return (
    <Paper className={classes.paper}>
      {stepper}

      <div>
        {currentCategory === categories.length - 1 ? summary : questionsBasedOnCategory}
      </div>

      {confirmationDialog}
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  questions: state.form.questions,
  categories: state.form.categories,
})

const mapDispatchToProps = {
  getQuestions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)