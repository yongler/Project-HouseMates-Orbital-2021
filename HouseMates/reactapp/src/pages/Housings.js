import React from 'react'
import { makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Housing from '../components/Housing'

const useStyles = makeStyles(theme => ({
  tooltip: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}))

const Housings = () => {
  const housings = [
    {
      id: 1,
      pic: "housing.jpg",
      name: "Atas Residence",
      specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
    },
    {
      id: 2,
      pic: "housing.jpg",
      name: "Atas Residence",
      specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
    },
    {
      id: 3,
      pic: "housing.jpg",
      name: "Atas Residence",
      specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
    },
    {
      id: 4,
      pic: "housing.jpg",
      name: "Atas Residence",
      specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
    },
  ]

  const classes = useStyles()

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          {housings.map(housing => (
            <Grid item xs={12} key={housing.id}>
              <Housing housing={housing} />
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

export default Housings
