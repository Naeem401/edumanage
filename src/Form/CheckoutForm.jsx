import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const CheckoutForm = ({ enrollmentInfo, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);

  const totalPrice = enrollmentInfo?.price;

  // Fetch client secret from server on component mount
  useEffect(() => {
        if (totalPrice > 0) {
            axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [totalPrice])

  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   setProcessing(true);

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const card = elements.getElement(CardElement);

  //   if (!card) {
  //     return;
  //   }

  //   // Create payment method using Stripe.js
  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card,
  //   });

  //   if (error) {
  //     console.error('[Error creating payment method]', error);
  //     setCardError(error.message);
  //     setProcessing(false);
  //     return;
  //   }

  //   // Confirm payment using client secret and payment method
  //   const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: card,
  //       billing_details: {
  //         email: user?.email,
  //         name: user?.displayName,
  //       },
  //     },
  //   });

  //   if (confirmError) {
  //     console.error('[Error confirming payment]', confirmError);
  //     setCardError(confirmError.message);
  //     setProcessing(false);
  //     return;
  //   }

  //   if (paymentIntent.status === 'succeeded') {
  //     // Prepare enrollment data to send to backend
  //     const enrollmentData = {
  //       ...enrollmentInfo,
  //       paymentInfo: {
  //         paymentMethodId: paymentMethod.id,
  //         cardBrand: paymentMethod.card.brand,
  //         cardLast4: paymentMethod.card.last4,
  //       },
  //     };

  //     try {
  //       // Send enrollment data to backend to enroll user in class
  //       const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/enroll`, enrollmentData);
  //       console.log('Enrollment response:', data);

  //       // Handle success scenario
  //       closeModal();
  //       toast.success('Enrolled successfully');
  //       navigate('/dashboard/my-enrollments');
  //     } catch (error) {
  //       console.error('Error enrolling user:', error);
  //       toast.error('Failed to enroll. Please try again.');
  //     }
  //   }

  //   setProcessing(false);
  // };

   const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setCardError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setCardError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    transactionId: paymentIntent.id,
                    date: new Date(),
                     email: user?.email,
                    name: user?.displayName,
                    enrolldClassDetails: enrollmentInfo
                }

                const res = await axios.post(`${import.meta.env.VITE_API_URL}/payments`, payment);
                console.log('payment saved', res.data);
               // Handle success scenario
        closeModal();
        toast.success('Enrolled successfully');
        navigate('/dashboard/myenroll-classes');

            }
        }

    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        <div className='flex mt-2 justify-around'>
          <button
            disabled={!stripe || !clientSecret || processing}
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          >
            {processing ? <p>Loading...</p> : `Pay ${enrollmentInfo?.price}`}
          </button>
          <button
            onClick={closeModal}
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
