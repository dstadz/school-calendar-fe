import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@chakra-ui/core';
import axios from 'axios';


const addTemplate = async (data, { googleId }) => {
  const template = { ...data, googleId };
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT_URL}/api/template`,
      template
    );
    console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const CreateTemplateForm = (props) => {
  const { setFormOpen, setTemplateList, currentUser, formOpen } = props;
  // const { googleApi, api } = useAuth();
  const { register, handleSubmit } = useForm();

  // Submit for template form
const onSubmit = async formData => {
    const template = addTemplate(formData, currentUser);
    await setTemplateList(prevTemplates => [...prevTemplates, template]);
    setFormOpen(!formOpen);
  };

  return (

    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="title"
          name="summary"
          id="summary"
          ref={register({ maxLength: 80, required: true })}
        />
        <Input
          type="text"
          placeholder="notes"
          name="description"
          id="description"
          ref={register({ maxLength: 100 })}
        />
        <Input
          type="time"
          name="starttime"
          id="starttime"
          ref={register({ required: true })}
        />
        <Input
          type="time"
          name="endtime"
          id="endtime"
          ref={register({ required: true })}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>

  );
};

export default CreateTemplateForm;
