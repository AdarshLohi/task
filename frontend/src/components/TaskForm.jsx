// src/components/TaskForm.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const taskSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  completed: Yup.boolean()
});

// eslint-disable-next-line react/prop-types
const TaskForm = ({ initialValues, onSubmit, buttonText }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <Field
              type="text"
              name="title"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <Field type="checkbox" name="completed" className="mr-2" />
              <span className="text-gray-700">Completed</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            {isSubmitting ? 'Submitting...' : buttonText}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;