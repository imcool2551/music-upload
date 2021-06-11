import React from 'react';
import { Field, reduxForm } from 'redux-form';

const passwordMatch = (value, allValues) =>
  value !== allValues.password ? '비밀번호가 일치하지 않습니다' : undefined;

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span style={{ color: 'red' }}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, onSubmit } = props;
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
      <div className="field">
        <Field
          name="passwordMatch"
          type="password"
          component={renderField}
          label="비밀번호 확인"
          validate={[passwordMatch]}
        />
      </div>
      <div className="field">
        <Field
          name="nickname"
          type="text"
          component={renderField}
          label="닉네임"
        />
      </div>
      <div>
        <button className="ui button" type="submit">
          회원가입
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'signupForm',
})(FieldLevelValidationForm);
