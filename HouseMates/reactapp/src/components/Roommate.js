import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import Pic from '../static/mrbean.jpg'

// Roommate consists of poster's description: pic, name, gender, bio and top 3 preferred roommate tags.
const Roommate = ({ roommate }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345,
      cursor: 'pointer',
      alignSelf: 'center',
    },
    media: {
      height: 140,
    },
    tag: {
      marginRight: 5,
      marginTop: 5,
  },
    text: {
      height: 100,
    },
  }))

  // Hooks
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Link to={`/roommates/${roommate.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        {/* Pic */}
        <CardMedia
          className={classes.media}
          image={Pic}
          title={roommate.name}
        />

        <CardActionArea>
          {/* Poster's description */}
          <CardContent>
            {/* Name */}
            <Typography variant="h5" gutterBottom>
              {roommate.name}
            </Typography>

            {/* Age, gender and bio */}
            <Typography variant="body2" color="textSecondary" className={classes.text}>
              {roommate.age} &middot; {roommate.gender} &middot; {roommate.bio.length > 220 ? roommate.bio.substring(0, 220) + "..." : roommate.bio}
            </Typography>

            <br />

            <Typography variant="body2" color="textSecondary" gutterBottom>
              Looking for roommates who are:
            </Typography>

            {/* Top 3 preferred roommate tags */}
            {roommate.specs.map(spec =>
              <Chip key={spec} label={spec} color="primary" className={classes.tag} />
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default Roommate
