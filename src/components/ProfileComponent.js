import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'

const ProfileComponent = ({name, desc, pic}) => {
  return (
    <Card style={{ display: "flex", flexDirection: "row", margin: 10 }}>
      <CardMedia
        image={pic}
        title={name}
        style={{ backgroundColor: "yellow", width: 100}}
      />
      <CardContent>
        <Typography>{name}</Typography>
        <Typography variant="body1" color="textSecondary">{desc}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProfileComponent
