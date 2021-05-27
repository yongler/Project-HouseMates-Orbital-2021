import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    cursor: 'pointer'
  },
  media: {
    height: 140,
  },
  tag: {
    marginRight: 5
  },
  text: {
    height: 100,
  },
}))

const Roommate = ({ roommate }) => {
  const classes = useStyles()

  return (
    <Link to={`/roommates/${roommate.id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={roommate.pic}
          title={roommate.name}
        />
        
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {roommate.name}
            </Typography>

            <Typography variant="body2" color="textSecondary" className={classes.text}>
              {roommate.age} &middot; {roommate.gender} &middot; {roommate.bio.length > 220 ? roommate.bio.substring(0, 220) + "..." : roommate.bio}
            </Typography>

            <br />

            <Typography variant="body2" color="textSecondary" gutterBottom>
              Looking for roommates who are:
            </Typography>

            {roommate.specs.map(spec =>
              <Chip key={spec} label={spec} color="primary" className={classes.tag} />
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default Roommate
