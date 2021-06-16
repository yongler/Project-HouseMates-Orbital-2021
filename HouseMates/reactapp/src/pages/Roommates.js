import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Roommate from '../components/Roommate'

// Roommates consists of list of Roommate and post button.
const Roommates = () => {
  // Styling
  const useStyles = makeStyles(theme => ({
    tooltip: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
    },
  }))

  // Data (hard coded for now)
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

  // Hooks
  const classes = useStyles()
  const history = useHistory()

  // Handlers
  const handleClick = () => { history.push('/form') }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {/* List of Roommate */}
      <Container>
        <Grid container spacing={2}>
          {roommates.map(roommate => (
            <Grid item xs={12} md={6} lg={4} key={roommate.id} className={classes.grid}>
              <Roommate roommate={roommate} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Post button */}
      <Tooltip title="" onClick={handleClick}>
        <Fab color="primary" className={classes.tooltip}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  )
}

export default Roommates
