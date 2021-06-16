import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Tooltip, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Pic from '../static/housing.jpg'

// HousingCardCard consists of housing description: name and facilities, and pic.
const HousingCard = ({ post }) => {
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
    tooltip: {
      float: 'right',
      marginRight: 5,
      marginTop: 5,
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // Handlers
  const handleClick = () => { history.push('/housing-form') }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        {/* HousingCard description */}
        <CardContent className={classes.content}>
          {/* Name */}
          <Typography variant="h5">{post.name}</Typography>

          {/* Facilities */}
          <Typography variant="body2" color="textSecondary">
            {post.specs.map((spec, index) =>
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
        title={post.name}
      >
        {/* Edit button */}
        <Tooltip title="" className={classes.tooltip} onClick={handleClick}>
          <IconButton style={{ color: "black" }} ><EditIcon /></IconButton>
        </Tooltip>
      </CardMedia>
    </Card>
  )
}

export default HousingCard
