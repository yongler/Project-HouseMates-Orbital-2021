import React from 'react'
import { useHistory } from 'react-router-dom'
import Posts from '../components/Posts'
import RoommateCard from '../components/RoommateCard'

// Roommates consists of list of RoommateCard and post button.
const Roommates = () => {
  // Hooks
  const history = useHistory()

  // Handlers
  const handlePostButton = () => { history.push('/roommate-form') }

  // Data (hard coded for now)
  const posts = [
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

  return (
    <div>
      <Posts
        postType={7}
        handlePostButton={handlePostButton}
        PostComponent={RoommateCard}
        xs={12}
        md={6}
        lg={4}
        posts={posts}
      />
    </div>
  )
}

export default Roommates
