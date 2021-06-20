import React from 'react'
import { useHistory } from 'react-router-dom'
import Posts from '../components/Posts'
import HousingCard from '../components/HousingCard'

// Housings consists of list of Roommate and post button.
const Housings = () => {
  // // Data (hard coded for now)
  // const posts = [
  //   {
  //     id: 1,
  //     pic: "housing.jpg",
  //     name: "Atas Residence",
  //     specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
  //   },
  //   {
  //     id: 2,
  //     pic: "housing.jpg",
  //     name: "Atas Residence",
  //     specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
  //   },
  //   {
  //     id: 3,
  //     pic: "housing.jpg",
  //     name: "Atas Residence",
  //     specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
  //   },
  //   {
  //     id: 4,
  //     pic: "housing.jpg",
  //     name: "Atas Residence",
  //     specs: ["6 guests", "2 bedrooms", "5 beds", "2 baths", "Air conditioning", "Free parking", "Wifi", "Pool"],
  //   },
  // ]

  // Hooks
  const history = useHistory()

  // Handlers
  const handlePostButton = () => { history.push('/housing-form') }

  return (
    <div>
      <Posts
        postType={8}
        handlePostButton={handlePostButton}
        PostComponent={HousingCard}
        xs={12}
        md={12}
        lg={12}
      />
    </div>
  )
}

export default Housings
