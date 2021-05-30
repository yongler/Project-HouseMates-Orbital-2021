import React from 'react'
import Box from '@material-ui/core/Box'
import Footer from '../components/Footer'
import Logo from '../static/housemates-logo-with-text-black.svg'

// LayoutOne consists of logo at the top of the component and footer at the bottom.
const LayoutOne = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Logo */}
      <img
        alt="logo"
        src={Logo}
        width="150"
        height="150"
        style={{ marginTop: 50 }}
      />

      {/* Component */}
      {children}

      {/* Footer */}
      <Box mt={8}><Footer /></Box>
    </div>
  )
}

export default LayoutOne
