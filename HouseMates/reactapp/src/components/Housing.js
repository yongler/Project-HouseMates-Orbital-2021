import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { CardActionArea } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    height: 200,
  },
  content: {
    flex: '1 0 auto',
  },
  media: {
    width: 400,
  },
}))

const Housing = ({ housing }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent className={classes.content}>
          <Typography variant="h5"> {housing.name} </Typography>

          <Typography variant="body2" color="textSecondary">
            {housing.specs.map((spec, index) =>
              index === 0
                ? <React.Fragment key={spec}>{spec} </React.Fragment>
                : <React.Fragment key={spec}>&middot; {spec} </React.Fragment>
            )}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardMedia
        className={classes.media}
        image={housing.pic}
        title={housing.name}
      />
    </Card>
  )
}

export default Housing
