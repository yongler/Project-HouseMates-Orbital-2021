import React from 'react'
// import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit"> */}
        Team Eclipse
      {/* </Link> */}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Footer
