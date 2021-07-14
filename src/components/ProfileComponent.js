import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import { ROOMMATE_FORM } from '../globalConstants'

const ProfileComponent = ({ name, desc, pic, type, id }) => {
  // Hooks
  const history = useHistory()

  // Handlers
  const handleClick = () => {
    if (type === ROOMMATE_FORM) {
      history.push(`/roommates/${id}`)
    } else {
      history.push(`/housings/${id}`)
    }
  }
  return (
    <Link onClick={handleClick} style={{ textDecoration: 'none' }}>
    <Card style={{ display: "flex", flexDirection: "row", margin: 10 }}>
      <CardMedia
        image={pic}
        title={name}
        style={{ width: 100 }}
      />
      <CardActionArea>
        <CardContent>
          <Typography>{name}</Typography>
          <Typography variant="body1" color="textSecondary">{desc}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  )
}

export default ProfileComponent
