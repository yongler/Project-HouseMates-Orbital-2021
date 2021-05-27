import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
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
      bio: "Rowan Sebastian Atkinson CBE is an English actor, comedian, and writer. He is best known for his work on the sitcoms Blackadder and Mr. Bean. Rowan Sebastian Atkinson CBE is an English actor, comedian, and writer. He is best known for his work on the sitcoms Blackadder and Mr. Bean. Rowan Sebastian Atkinson CBE is an English actor, comedian, and writer. He is best known for his work on the sitcoms Blackadder and Mr. Bean.",
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
  const history = useHistory()

  const handleClick = () => { history.push("/form") }

  return (
    <div>
      <Container>
        <Grid container spacing={5} justify="space-between">
          {roommates.map(roommate => (
            <Grid item xs={12} md={6} lg={4} key={roommate.id}>
              <Roommate roommate={roommate} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Tooltip title="" onClick={handleClick}>
        <Fab color="primary" className={classes.tooltip}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default Roommates
