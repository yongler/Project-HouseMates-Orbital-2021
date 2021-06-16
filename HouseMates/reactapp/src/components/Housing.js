import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { CardActionArea } from '@material-ui/core'
import Pic from '../static/housing.jpg'

// Housing consists of housing description: name and facilities, and pic.
const Housing = ({ housing }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    card: {
      display: 'flex',
      height: 200,
      cursor: 'pointer',
    },
    content: {
      flex: '1 0 auto',
    },
    media: {
      width: 400,
    },
  }))

  // Hooks
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        {/* Housing description */}
        <CardContent className={classes.content}>
          {/* Name */}
          <Typography variant="h5">{housing.name}</Typography>

          {/* Facilities */}
          <Typography variant="body2" color="textSecondary">
            {housing.specs.map((spec, index) =>
              index === 0
                ? <Fragment key={spec}>{spec} </Fragment>
                : <Fragment key={spec}>&middot; {spec} </Fragment>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* Pic */}
      <CardMedia
        className={classes.media}
        image={Pic}
        title={housing.name}
      />
    </Card>
  )
}

export default Housing
