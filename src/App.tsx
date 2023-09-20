import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const SubscribeFormSchema = z.object({
  name: z.string().nonempty().min(10),
  email: z.string().nonempty().email().min(5),
  password: z.string().nonempty().min(6).max(10)    
});

type SubscribeFormProps = z.infer<typeof SubscribeFormSchema>;

type AlertProps = {
  isOn: boolean;
  status: string;
  message: string;
}

export default function App() {
  
  const [displayAlert, setDisplayAlert] = useState<AlertProps>({ isOn: false, status: '', message: ''});
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubscribeFormProps>({
    resolver: zodResolver(SubscribeFormSchema)
  });

  const subscribeForm = (data: SubscribeFormProps) => {
    try {
      fetch('http://juliobrazao.xyz:33006/createUser', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then(function(data){
        if (data.error){
          setDisplayAlert({
            isOn: data.error,
            status: 'danger',
            message: data.message
          })
          setTimeout(() => {
            setDisplayAlert({
              isOn: false,
              status: '',
              message: ''
            });
          }, 6000);
        } else {
          setDisplayAlert({
            isOn: !data.error,
            status: 'success',
            message: data.message
          });
          setTimeout(() => {
            setDisplayAlert({
              isOn: false,
              status: '',
              message: ''
            });
          }, 6000);
          reset();
        }
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <h1 className='text-center my-3'>
        <strong>
          Subscribe Form
        </strong>
      </h1>

      <div className="container-fluid mt-3">
        <form className="form-control" onSubmit={handleSubmit(subscribeForm)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors?.name?.message && 'border-danger'}`}
              id="name"
              {...register('name')}
            />
            <small id="emailHelpId" className="form-text text-danger">
              { errors?.name?.message }
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="text"
              className={`form-control ${errors?.email?.message && 'border-danger'}`}
              id="email"
              {...register('email')}
            />
            <small id="emailHelpId" className="form-text text-danger">
              { errors?.email?.message }
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors?.password?.message && 'border-danger'}`}
              id="password"
              {...register('password')}
            />
            <small id="emailHelpId" className="form-text text-danger">
             { errors?.password?.message }
            </small>
          </div>

          <div className="mb-3">
            <button className="btn btn-md btn-primary w-100">
              Subscribe
            </button>
          </div>
        </form>

        <div className={`alert alert-${displayAlert.status} mt-3 ${!displayAlert.isOn ? 'd-none' : ''}`} role="alert">
          { displayAlert.message }
        </div>
        
      </div>
    </>
  );
}
