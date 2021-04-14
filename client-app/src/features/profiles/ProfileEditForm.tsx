import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

interface Props {
  setEditProfileMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({setEditProfileMode}: Props) {
  const {profileStore: {profile, updateProfile}} = useStore();

  return (
      <Formik 
        enableReinitialize 
        initialValues={{displayName: profile?.displayName, bio: profile?.bio}} 
        onSubmit={values => {
          updateProfile(values).then(() =>  {
            setEditProfileMode(false);
          })
        }}
        validationSchema={Yup.object({
          displayName: Yup.string().required('The display name is required')
          })}
        >
        {({ isValid, isSubmitting, dirty}) => (
          <Form className='ui form' autoComplete='off'>
            <MyTextInput name='displayName' placeholder='Display Name' />
            
            <MyTextArea placeholder='Bio' name='bio' rows={3} />
            <Button 
              positive
              type='submit'
              loading={isSubmitting}
              content='Update profile'
              floated='right'
              disabled={!isValid || !dirty}
            />
          </Form>
        )}
      </Formik>   
  )
})