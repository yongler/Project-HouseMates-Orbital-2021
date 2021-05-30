import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// Profile consists of profile pic, name and list of settings.
const Profile = () => {
  // Styling
  const useStyles = makeStyles(theme => ({
    avatar: {
      height: 200,
      width: 200,
      marginBottom: 20,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    card: {
      width: '100%',
      marginLeft: 23,
      marginRight: 23,
    },
  }))

  // Content
  const accordions = [
    {
      summary: "Profile",
      details: [
        <ListItem>
          <Link to="/password/reset/confirm/:uid/:token" style={{ textDecoration: "none", color: "black" }}>
            <Typography>Change password</Typography>
          </Link>
        </ListItem>,
      ]
    },
  ]

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // Handlers
  const handleBack = () => { history.go(-1) }

  return (
    <div className={classes.card}>
      <Card>
        {/* Back button */}
        <CardHeader
          avatar={
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          }
        />

        <CardContent className={classes.content}>
          {/* Profile pic */}
          <Avatar className={classes.avatar} />

          {/* Name */}
          <Typography variant="h5" style={{ marginBottom: 20 }}>Rowan Atkinson</Typography>

          {/* List of settings */}
          <div style={{ width: "100%" }}>
            {accordions.map(accordion =>
              <Accordion key={accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{accordion.summary}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {accordion.details.map(detail => detail)}
                  </List>
                </AccordionDetails>
              </Accordion>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
