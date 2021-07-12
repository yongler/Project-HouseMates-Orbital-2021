import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import RoommateForm from '../pages/RoommateForm'
import { getPostDetail } from '../redux/post/actions'
import { ROOMMATE_FORM } from '../globalConstants'

const EditRoommateForm = ({ post, getPostDetail }) => {
  // Hooks
  const { id } = useParams()
  const [initialFormFields, setInitialFormFields] = useState({})

  // componentDidMount
  useEffect(() => { getPostDetail(id) }, [])

  useEffect(() => {
    const categories = post?.selected_choices
      .map(category => category
        .reduce((prev, curr) => ({ ...prev, [curr.question]: curr}), {})
      )
    const initialFormFields = Object.assign({}, categories)
    setInitialFormFields(initialFormFields)
  }, [post])

  return (
    <div>
      <RoommateForm
        initialFormFields={initialFormFields}
        id={id}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  post: state.post.post,
})

const mapDispatchToProps = {
  getPostDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoommateForm)
