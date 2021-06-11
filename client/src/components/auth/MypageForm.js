import React from 'react';
import { Field, reduxForm } from 'redux-form';

const passwordMatch = (value, allValues) =>
  value !== allValues.newPassword ? '비밀번호가 일치하지 않습니다' : undefined;

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
        ((error && <span>{error}</span>) ||
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
          name="originalPassword"
          type="password"
          component={renderField}
          label="현재 비밀번호"
        />
      </div>
      <div className="field">
        <Field
          name="newPassword"
          type="password"
          component={renderField}
          label="새 비밀번호"
        />
      </div>
      <div className="field">
        <Field
          name="newPasswordMatch"
          type="password"
          component={renderField}
          label="새 비밀번호 확인"
          validate={[passwordMatch]}
        />
      </div>
      <div>
        <button className="ui button" type="submit">
          비밀번호 변경
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'mypageForm',
})(FieldLevelValidationForm);
