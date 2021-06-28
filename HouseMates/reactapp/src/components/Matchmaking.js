import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Paper, Typography } from '@material-ui/core'
import {
  ROOMMATE_FORM,
  IRRELEVANT, A_LITTLE_IMPORTANT, SOMEWHAT_IMPORTANT, VERY_IMPORTANT, MANDATORY
} from '../globalConstants'
import { loadUser } from '../redux/auth/actions'
import { getUserPost, getPostList, editPost, postLoading, resetEditPostSuccess } from '../redux/post/actions'
import './components.css'

const Matchmaking = ({ user, userPost, posts, loadUser, getUserPost, getPostList, editPost, postLoading, loading, resetEditPostSuccess }) => {

  // States
  const history = useHistory()

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
    postLoading()

    // Get my post
    const myPost = userPost[0]
    // Get my post score list
    var myScoreList = myPost.score_list
    if (Array.isArray(myScoreList)) {
      myScoreList = myScoreList
        .reduce((prev, curr) => ({ ...prev, [curr.post]: curr }), {})
      myScoreList = Object.assign({}, myScoreList)
    }

    for (let k = 0; k < posts.length; k++) {
      // Get other post
      const otherPost = posts[k]
      // Get other post score list
      var otherScoreList = otherPost.score_list
      if (Array.isArray(otherScoreList)) {
        otherScoreList = otherScoreList
          .reduce((prev, curr) => ({ ...prev, [curr.post]: curr }), {})
        otherScoreList = Object.assign({}, otherScoreList)
      }

      if (otherPost.owner.id !== myPost.owner.id) {
        var myScore = 0
        var myTotalScore = 0
        var otherScore = 0
        var otherTotalScore = 0
        var numOfQuestions = 0

        for (let i = 0; i < otherPost.selected_choices.length; i++) {
          for (let j = 0; j < otherPost.selected_choices[i].length; j++) {
            // Update my post score
            if (otherPost.selected_choices[i][j].myChoice === myPost.selected_choices[i][j].otherChoice ||
              Array.isArray(otherPost.selected_choices[i][j].myChoice) && equals(otherPost.selected_choices[i][j].myChoice, myPost.selected_choices[i][j].otherChoice)
            ) myScore += getScore(myPost.selected_choices[i][j].priority)

            // Update my post total score
            myTotalScore += getScore(myPost.selected_choices[i][j].priority)

            // Update other post score
            if (myPost.selected_choices[i][j].myChoice === otherPost.selected_choices[i][j].otherChoice ||
              Array.isArray(myPost.selected_choices[i][j].myChoice) && equals(myPost.selected_choices[i][j].myChoice, otherPost.selected_choices[i][j].otherChoice)
            )
              otherScore += getScore(otherPost.selected_choices[i][j].priority)

            // Update other post total score
            otherTotalScore += getScore(otherPost.selected_choices[i][j].priority)

            // Update number of questions
            numOfQuestions++
          }
        }

        // Calculate average score
        const averageScore = (Math.pow((myScore / myTotalScore) * (otherScore / otherTotalScore), 1 / numOfQuestions) * 100).toFixed(0)

        // Update my post score list
        myScoreList = {
          ...myScoreList,
          [otherPost.id]: {
            post: otherPost.id,
            score: averageScore,
          }
        }
        // Update other post score list
        otherScoreList = {
          ...otherScoreList,
          [myPost.id]: {
            post: myPost.id,
            score: averageScore,
          }
        }

        // Save other post score list and total score
        editPost(otherPost.id, otherPost.post_form_type, undefined, undefined, otherScoreList, otherTotalScore)
      }
    }
    // Save my post score list and total score
    editPost(myPost.id, myPost.post_form_type, undefined, undefined, myScoreList, myTotalScore)
  }
  const handleClose = () => {
    resetEditPostSuccess()
    history.push('/roommates')
}

  // componentDidMount
  useEffect(() => { getPostList(ROOMMATE_FORM) }, [])
  useEffect(() => user ? getUserPost(user.id) : null, [user])
  useEffect(() => userPost.length > 0 ? handleMatchmaking() : null, [userPost])

  return (
    <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
      {/* <div id="heart" /> */}
      {loading
        ?
        <Typography variant="h6">Matching the perfect roommate for you...</Typography>
        :
        <>
          <Typography gutterBottom variant="h6">Matching completed</Typography>
          <Button autoFocus variant="contained" color="primary" onClick={handleClose}>Return to roommate dashboard</Button>
        </>}
    </Paper>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userPost: state.post.userPost,
  posts: state.post.posts,
  loading: state.post.postLoading,
})

const mapDispatchToProps = {
  loadUser,
  getUserPost,
  getPostList,
  editPost,
  postLoading: () => (dispatch) => dispatch(postLoading()),
  resetEditPostSuccess,
}

export default connect(mapStateToProps, mapDispatchToProps)(Matchmaking)

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



