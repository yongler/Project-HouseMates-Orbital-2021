import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Paper, Typography } from '@material-ui/core'
import { ROOMMATE_FORM, IRRELEVANT, A_LITTLE_IMPORTANT, SOMEWHAT_IMPORTANT, VERY_IMPORTANT, MANDATORY } from '../globalConstants'
import { loadUser } from '../redux/auth/actions'
import { getUserPosts, getPostList, editPost, resetEditPostSuccess } from '../redux/post/actions'
import { createScore, editScore, getScoreList, resetGetScoreListSuccess, scoreLoading } from '../redux/score/actions'
import './components.css'

const Matchmaking = ({
  user,
  userRoommatePosts, getUserPosts,
  posts, previous, next, count, getPostList,
  editPost, resetEditPostSuccess,
  loading, postLoading,
  createScore, editScore, scoreLoading,
  scoreList, getScoreListSuccess, getScoreList, resetGetScoreListSuccess,
}) => {

  // Hooks
  const history = useHistory()

  // States
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(2)
  const [matchmaking, setMatchmaking] = useState(true)

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

  // Handlers
  const handleMatchmaking = () => {
    if (allPosts.length > 0) {
      setMatchmaking(false)

      scoreLoading()

      var myScore = 0
      var myTotalScore = 0
      var otherScore = 0
      var otherTotalScore = 0
      var numOfQuestions = 0

      // Get my post
      const myPost = userRoommatePosts[0]
      // Get my post score set
      const myScoreSet = scoreList.reduce((prev, curr) => ({ ...prev, [myPost.id === curr.post1 ? curr.post2 : curr.post1]: curr }), {})

      allPosts.forEach((post) => {
        // Get other post
        const otherPost = post

        if (otherPost.owner.id !== myPost.owner.id) {
          otherPost.selected_choices.forEach((category, i) => {
            category.forEach((question, j) => {
              // Update my post score
              // Multiple choice
              if (Array.isArray(otherPost.selected_choices[i][j].myChoice)) {
                var same = 0
                var total = myPost.selected_choices[i][j].otherChoice.length
                for (let choice in otherPost.selected_choices[i][j].myChoice) {
                  if (choice in myPost.selected_choices[i][j].otherChoice) same++
                }
                myScore += (getScore(myPost.selected_choices[i][j].priority) * (same / total))
                // Single choice
              } else if (otherPost.selected_choices[i][j].myChoice === myPost.selected_choices[i][j].otherChoice) {
                myScore += getScore(myPost.selected_choices[i][j].priority)
              }

              // Update my post total score
              myTotalScore += getScore(myPost.selected_choices[i][j].priority)

              // Update other post score
              // Multiple choice
              if (Array.isArray(myPost.selected_choices[i][j].otherChoice)) {
                var same = 0
                var total = otherPost.selected_choices[i][j].otherChoice.length
                for (let choice in myPost.selected_choices[i][j].myChoice) {
                  if (choice in otherPost.selected_choices[i][j].otherChoice) same++
                }
                otherScore += (getScore(otherPost.selected_choices[i][j].priority) * (same / total))
                // Single choice
              } else if (myPost.selected_choices[i][j].myChoice === otherPost.selected_choices[i][j].otherChoice) {
                otherScore += getScore(otherPost.selected_choices[i][j].priority)
              }

              // Update other post total score
              otherTotalScore += getScore(otherPost.selected_choices[i][j].priority)

              // Update number of questions
              numOfQuestions++
            })
          })

          // Calculate average score
          const averageScore = Number((Math.pow((myScore / myTotalScore) * (otherScore / otherTotalScore), 1 / numOfQuestions) * 100).toFixed(0))

          if (myScoreSet[otherPost.id]) {
            editScore(myScoreSet[otherPost.id].id, averageScore)
          } else {
            const owner1 = myPost.id < otherPost.id ? myPost.owner.id : otherPost.owner.id
            const owner2 = myPost.id > otherPost.id ? myPost.owner.id : otherPost.owner.id
            const post1 = myPost.id < otherPost.id ? myPost.id : otherPost.id
            const post2 = myPost.id > otherPost.id ? myPost.id : otherPost.id
            createScore(averageScore, owner1, owner2, post1, post2)
          }
        }
      })
      resetGetScoreListSuccess()
    }
  }
  const handleClose = () => {
    resetEditPostSuccess()
    history.push('/roommates')
  }

  // useEffect
  // Get all roommate posts
  useEffect(() => {
    if (next !== null) {
      getPostList(ROOMMATE_FORM, page)
      setPage(page + 1)
    }
  }, [next])
  useEffect(() => setAllPosts([...allPosts, ...posts]), [posts])
  // Get user roommate post
  useEffect(() => { if (user) getUserPosts(user.id, ROOMMATE_FORM) }, [user])
  // Get user roommate post score list
  useEffect(() => { if (userRoommatePosts.length > 0) getScoreList(userRoommatePosts[0].id) }, [userRoommatePosts])
  // Run matchmaking algo
  useEffect(() => {
    if (matchmaking && userRoommatePosts.length > 0 && getScoreListSuccess && allPosts.length === count) handleMatchmaking()
  }, [userRoommatePosts, getScoreListSuccess, allPosts])

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
  userRoommatePosts: state.post.userRoommatePosts,
  posts: state.post.posts,
  loading: state.post.postLoading,
  previous: state.post.previous,
  next: state.post.next,
  count: state.post.count,
  scoreList: state.score.scoreList,
  getScoreListSuccess: state.score.getScoreListSuccess,
})

const mapDispatchToProps = {
  loadUser,
  getUserPosts,
  getPostList,
  editPost,
  scoreLoading: () => (dispatch) => dispatch(scoreLoading()),
  resetEditPostSuccess,
  createScore,
  editScore,
  scoreLoading,
  getScoreList,
  resetGetScoreListSuccess,
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



