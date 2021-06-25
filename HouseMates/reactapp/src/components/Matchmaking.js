// preliminaries 
// https://www.youtube.com/watch?v=m9PiPlRuy6E&t=304s

//  (only for roommates post, in profile form its empty )
// radiogroup for importance of each question, value stored in selected_choices
// theres a score_list, total_score field in post model

// assume only 1 post per user first 




// algo
// get current_post.selected_choices (posts)
// get current_post.owner.selected_choices (profile)

// get other_post.selected_choices (posts)
// get other_post.owner.selected_choices (profile)

// n = 0

// loop through length of selected_choices (posts), at every iteration:
//     get score1 of current_post.choice, add to current_post.total_score (if dh)
//     get score2 of other_post.choice, add to other_post.total_score (if dh)

//     if current_post.choice === other_post.owner.choice:
//         other_post.obtained_score += score1

//     if current_post.owner.choice === other_post.choice:
//         current_post.obtained_score += score2

//     n += 1

    
// percentage of other_post matching current_post = other_post.obtained_score / current_post.total_score 
// percentage of current_post matching other_post = current_post.obtained_score / other_post.total_score 

// matching percentage = nth root of 2 percentages

// add to score_list of both posts:
//     in other_post -> "current_post.owner.id":"matching percentage"
//     in current_post -> "other_post.owner.id":"matching percentage"






// displaying 
// at each post, if current user.id === score_list key, display matching percentage


import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  ROOMMATE_FORM,
  IRRELEVANT, A_LITTLE_IMPORTANT, SOMEWHAT_IMPORTANT, VERY_IMPORTANT, MANDATORY
} from '../globalConstants'
import { loadUser } from '../redux/auth/actions'
import { getUserPost, getPostList, editPost } from '../redux/post/actions'

const Matchmaking = ({ user, userPost, posts, loadUser, getUserPost, getPostList, editPost }) => {
  // Helper functions
  const getScore = priorityLevel => {
    switch (priorityLevel) {
      case IRRELEVANT: return 0
      case A_LITTLE_IMPORTANT: return 1
      case SOMEWHAT_IMPORTANT: return 10
      case VERY_IMPORTANT: return 50
      case MANDATORY: return 250
      default: return 0
    }
  }
  const equals = (arr1, arr2) => (
    arr1.reduce((prev, curr) => prev && arr2.includes(curr), true) && arr2.reduce((prev, curr) => prev && arr1.includes(curr), true)
  )


  // Handlers
  const handleMatchmaking = () => {
    for (let k = 0; k < posts.length; k++) {
      const myPost = userPost[0]
      const otherPost = posts[k]

      if (otherPost.owner.id !== myPost.owner.id) {
        var myScore = 0
        var myTotalScore = 0
        var otherScore = 0
        var otherTotalScore = 0
        var numOfQuestions = 0

        for (let i = 0; i < otherPost.selected_choices.length; i++) {
          for (let j = 0; j < otherPost.selected_choices[i].length; j++) {
            if (otherPost.selected_choices[i][j].myChoice === myPost.selected_choices[i][j].otherChoice ||
              Array.isArray(otherPost.selected_choices[i][j].myChoice) && equals(otherPost.selected_choices[i][j].myChoice, myPost.selected_choices[i][j].otherChoice)
            ) myScore += getScore(myPost.selected_choices[i][j].priority)

            myTotalScore += getScore(myPost.selected_choices[i][j].priority)

            if (myPost.selected_choices[i][j].myChoice === otherPost.selected_choices[i][j].otherChoice ||
              Array.isArray(myPost.selected_choices[i][j].myChoice) && equals(myPost.selected_choices[i][j].myChoice, otherPost.selected_choices[i][j].otherChoice)
            )
              otherScore += getScore(otherPost.selected_choices[i][j].priority)

            otherTotalScore += getScore(otherPost.selected_choices[i][j].priority)

            numOfQuestions++
          }
        }

        const averageScore = (Math.pow((myScore / myTotalScore) * (otherScore / otherTotalScore), 1 / numOfQuestions) * 100).toFixed(2)

        var myScoreList = Object.assign({}, myPost.score_list)
        myScoreList = {
          ...myScoreList,
          [otherPost.id]: {
            post: otherPost.id,
            score: averageScore,
          }
        }
        myScoreList = Object.values(myScoreList)
        var otherScoreList = Object.assign({}, otherPost.score_list)
        otherScoreList = {
          ...otherScoreList,
          [myPost.id]: {
            post: myPost.id,
            score: averageScore,
          }
        }
        otherScoreList = Object.values(otherScoreList)
        const myPostOwner = {
          first_name: myPost.owner.first_name,
          last_name: myPost.owner.last_name,
        }
        editPost(myPost.id, myPost.post_form_type, myPost.selected_choices, myPostOwner, myScoreList, myTotalScore)
        const otherPostOwner = {
          first_name: otherPost.owner.first_name,
          last_name: otherPost.owner.last_name,
        }
        editPost(otherPost.id, otherPost.post_form_type, otherPost.selected_choices, otherPostOwner, otherScoreList, otherTotalScore)

      }
    }
  }

  // componentDidMount
  useEffect(() => { getPostList(ROOMMATE_FORM) }, [])
  useEffect(() => user ? getUserPost(user.id) : null, [user])

  return (
    <div>
      <button onClick={handleMatchmaking}>match</button>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userPost: state.post.userPost,
  posts: state.post.posts,
})

const mapDispatchToProps = {
  loadUser,
  getUserPost,
  getPostList,
  editPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(Matchmaking)
