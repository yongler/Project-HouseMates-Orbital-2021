import React from 'react'
import { useHistory } from 'react-router-dom'
import Posts from '../components/Posts'
import RoommateCard from '../components/RoommateCard'
import { ROOMMATE_FORM } from '../globalConstants'

// Roommates consists of list of RoommateCard and post button.
const Roommates = () => {
  // Hooks
  const history = useHistory()

  // Handlers
  const handlePostButton = () => { history.push('/roommate-form') }

  return (
    <div>
      <Posts
        postType={ROOMMATE_FORM}
        handlePostButton={handlePostButton}
        PostComponent={RoommateCard}
        xs={12}
        md={6}
        lg={4}
      />
    </div>
  )
}

export default Roommates
