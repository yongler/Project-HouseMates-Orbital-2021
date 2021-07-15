import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { MobileStepper, IconButton } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const ImageGallery = ({ tutorialSteps }) => {
  // Styling
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      position: "relative",
    },
    img: {
      height: 300,
      display: 'block',
      overflow: 'hidden',
      width: 500,
    },
  }))

  // Hooks
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = tutorialSteps.length

  // Handlers
  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) }
  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) }
  const handleStepChange = (step) => { setActiveStep(step) }

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style={{ position: 'relative' }}
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2
              ? <img className={classes.img} src={step} />
              : null}
          </div>))}
      </AutoPlaySwipeableViews>

      {maxSteps > 1 &&
        <MobileStepper
          steps={maxSteps}
          activeStep={activeStep}
          nextButton={
            <IconButton
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <KeyboardArrowRight />
            </IconButton>}
          backButton={
            <IconButton
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </IconButton>}
          style={{ position: "absolute", bottom: 0, opacity: 0.5, height: 15 }}
        />}
    </div>
  )
}

export default ImageGallery