import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import { Card, CardActionArea, CardContent, CardMedia, Chip, IconButton, Tooltip, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Pic from '../static/mrbean.jpg'

// RoommateCard consists of poster's description: pic, name, gender, bio and top 3 preferred roommate tags.
const RoommateCard = ({ post }) => {
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
    tooltip: {
      float: 'right',
      marginRight: 5,
      marginTop: 5,
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => { history.push('/roommate-form') }

  return (
    <Card className={classes.card}>
      {/* Edit button */}
      <Tooltip title="" className={classes.tooltip} onClick={handleClick}>
        <IconButton style={{ color: "black" }}><EditIcon /></IconButton>
      </Tooltip>

      <Link to={`/roommates/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        {/* Pic */}
        <CardMedia
          className={classes.media}
          image={Pic}
          title={post.name}
        />

        <CardActionArea>
          {/* Poster's description */}
          <CardContent>
            {/* Name */}
            <Typography variant="h5" gutterBottom>
              {post.name}
            </Typography>

            {/* Age, gender and bio */}
            <Typography variant="body2" color="textSecondary" className={classes.text}>
              {post.age} &middot; {post.gender} &middot; {post.bio.length > 220 ? post.bio.substring(0, 220) + "..." : post.bio}
            </Typography>

            <br />

            <Typography variant="body2" color="textSecondary" gutterBottom>
              Looking for roommates who are:
            </Typography>

            {/* Top 3 preferred roommate tags */}
            {post.specs.map(spec =>
              <Chip key={spec} label={spec} color="primary" className={classes.tag} />
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export default RoommateCard
