import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Card, CardContent, CardHeader, Chip, Fab, IconButton, Tooltip, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Pic from '../static/mrbean.jpg'
import { getPostDetail } from '../redux/post/actions'
import { getQuestions } from '../redux/form/actions'

// RoommateDetail consists of profile pic, name, categories of tags and post button.
const RoommateDetail = ({ post, roommateCategories, getPostDetail, getQuestions }) => {
  // Styling
  const useStyles = makeStyles(theme => ({
    avatar: {
      height: 200,
      width: 200,
      marginBottom: 20,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    tag: {
      marginRight: 5,
      marginTop: 5,
    },
    category: {
      marginBottom: 30,
    },
    card: {
      width: '100%',
      marginLeft: 23,
      marginRight: 23,
    },
    tooltip: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }))

  // Hooks
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()

  // Handlers
  const handleBack = () => { history.go(-1) }
  const handleClick = () => { history.push("/form") }

  // componentDidMount
  useEffect(() => {
    window.scrollTo(0, 0)
    if (roommateCategories.length === 0) { getQuestions(1) }
    getPostDetail(id)
  }, [])

  return (
    <div className={classes.card}>
      {post && post.id.toString() === id.toString()
        ?
        <>
          <Card>
            {/* Back button */}
            <CardHeader avatar={<IconButton onClick={handleBack}><ArrowBackIcon /></IconButton>} />

            <CardContent className={classes.content}>
              {/* Profile pic */}
              <Avatar className={classes.avatar} src={Pic} />

              {/* Name */}
              <Typography variant="h5">{id} {post.owner.first_name} {post.owner.last_name}</Typography>

              {/* Text */}
              <Typography variant="body2" color="textSecondary" className={classes.category}>
                Looking for roommates who are:
              </Typography>

              {/* Categories of tags */}
              <div>
                {post.selected_choices.map((category, index) =>
                  <div key={category} className={classes.category}>
                    {/* Category */}
                    <Typography variant="body1" color="textPrimary" gutterBottom>
                      {roommateCategories[index]}
                    </Typography>

                    {/* Tags */}
                    {category.map(question =>
                      Array.isArray(question.choice)
                        ?
                        // Multiple choice question
                        question.choice.map(choice =>
                          <Chip key={choice} className={classes.tag} label={choice} color="primary" />)
                        :
                        // Single choice question
                        <Chip key={question} className={classes.tag} label={question.choice} color="primary" />)}
                  </div>)
                }
              </div>
            </CardContent>
          </Card >

          {/* Post button */}
          <Tooltip title="" onClick={handleClick}>
            <Fab color="primary" className={classes.tooltip}><AddIcon /></Fab>
          </Tooltip>
        </>
        :
        null
      }
    </div>
  )
}

const mapPropsToState = state => ({
  post: state.post.post,
  roommateCategories: state.form.roommateCategories,
})

const mapDispatchToProps = {
  getQuestions,
  getPostDetail,
}

export default connect(mapPropsToState, mapDispatchToProps)(RoommateDetail);
