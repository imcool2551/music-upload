import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  </div>
);

const renderImageUpload = ({ input, label, meta: { touched, error } }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            input.onChange(e.target.files[0]);
          }}
        />
        {touched && error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    </div>
  );
};

const renderMusicUpload = ({ input, label, meta: { touched, error } }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <div>
        <input
          type="file"
          accept=".mp3,audio/*"
          onChange={(e) => {
            input.onChange(e.target.files[0]);
          }}
        />
        {touched && error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    </div>
  );
};

const renderSongs = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button
        className="ui black basic button"
        type="button"
        onClick={() => fields.push({})}
      >
        노래 추가
      </button>
      {(touched || submitFailed) && error && (
        <span style={{ color: 'red' }}>{error}</span>
      )}
    </li>
    {fields.map((song, index) => (
      <li
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#E5EAEA',
        }}
        key={index}
      >
        <h4 className="ui orange inverted header">노래 #{index + 1}</h4>
        <div className="field">
          <Field
            name={`${song}.title`}
            type="text"
            component={renderField}
            label="노래 제목"
          />
        </div>
        <div className="field">
          <Field
            name={`${song}.artistName`}
            type="text"
            component={renderField}
            label="아티스트 이름"
          />
        </div>
        <div className="field">
          <Field
            name={`${song}.file`}
            component={renderMusicUpload}
            label="음원 파일"
          />
        </div>
        <div className="field">
          <button
            className="ui red basic button"
            type="button"
            onClick={() => fields.remove(index)}
          >
            노래 #{index + 1} 삭제
          </button>
        </div>
      </li>
    ))}
  </ul>
);

const FieldArraysForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="field">
        <Field
          name="albumName"
          type="text"
          component={renderField}
          label="앨범 이름"
        />
      </div>
      <div className="field">
        <Field
          name="albumImage"
          component={renderImageUpload}
          label="앨범 이미지"
        />
      </div>
      <div className="field">
        <FieldArray name="songs" component={renderSongs} />
      </div>
      <div className="field">
        <button className="ui green basic button" type="submit">
          완료
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'albumCreateForm',
  validate,
})(FieldArraysForm);
