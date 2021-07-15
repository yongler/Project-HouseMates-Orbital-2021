import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { getPostDetail } from "../redux/post/actions";
import HousingForm from "./HousingForm";

const EditHousingForm = ({ post, getPostDetail }) => {
  // Hooks
  const { id } = useParams();
  const [initialFormFields, setInitialFormFields] = useState({});

  // componentDidMount
  useEffect(() => {
    getPostDetail(id);
  }, []);

  useEffect(() => {
    const categories = post?.selected_choices.map((category) =>
      category.reduce((prev, curr) => ({ ...prev, [curr.question]: curr }), {})
    );
    const initialFormFields = Object.assign({}, categories);
    setInitialFormFields(initialFormFields);
  }, [post]);

  return (
    <div>
      <HousingForm initialFormFields={initialFormFields} id={id} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
});

const mapDispatchToProps = {
  getPostDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditHousingForm);
