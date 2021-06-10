import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const SubmitValidationForm = (props) => {
  const { error, handleSubmit, onSubmit } = props;
  return (
    <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <Field
          name="userId"
          type="text"
          component={renderField}
          label="아이디"
        />
      </div>
      <div className="field">
        <Field
          name="password"
          type="password"
          component={renderField}
          label="비밀번호"
        />
      </div>
      {error && <strong>{error}</strong>}
      <h4>
        멤버가 아니신가요? <Link to="/signup">회원가입</Link>
      </h4>
      <div className="field">
        <button className="ui button" type="submit">
          로그인
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'loginForm',
})(SubmitValidationForm);
