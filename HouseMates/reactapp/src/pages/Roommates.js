import React from 'react'
import { makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Roommate from '../components/Roommate'

const useStyles = makeStyles(theme => ({
  tooltip: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}))

const Roommates = () => {
  const roommates = [
    {
      id: 1,
      pic: "mrbean.jpg",
      name: "Rowan Atkinson",
      age: 66,
      gender: "Male",
      bio: "Rowan Sebastian Atkinson CBE is an English actor, comedian, and writer. He is best known for his work on the sitcoms Blackadder and Mr. Bean.",
      specs: ["Humorous", "Kind", "Cool"],
    },
    {
      id: 2,
      pic: "mrbean.jpg",
      name: "Rowan Atkinson",
      age: 66,
      gender: "Male",
      bio: "Rowan Sebastian Atkinson CBE is an English actor, comedian, and writer. He is best known for his work on the sitcoms Blackadder and Mr. Bean.",
      specs: ["Humorous", "Kind", "Cool"],
    },
    {
      id: 3,
      pic: "mrbean.jpg",
      name: "Rowan Atkinson",
      age: 66,
      gender: "Male",
      bio: "Rowan Sebastian Atkinson CBE is an English actor, comedian, and writer. He is best known for his work on the sitcoms Blackadder and Mr. Bean.",
      specs: ["Humorous", "Kind", "Cool"],
    },
    {
      id: 4,
      pic: "mrbean.jpg",
      name: "Rowan Atkinson",
      age: 66,
      gender: "Male",
      bio: "Rowan Sebastian Atkinson CBE is an English actor, comedian, and writer. He is best known for his work on the sitcoms Blackadder and Mr. Bean.",
      specs: ["Humorous", "Kind", "Cool"],
    },
  ]

  const classes = useStyles()

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          {roommates.map(roommate => (
            <Grid item xs={12} md={6} lg={4} key={roommate.id}>
              <Roommate roommate={roommate} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Tooltip title="">
        <Fab color="primary" className={classes.tooltip}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default Roommates
