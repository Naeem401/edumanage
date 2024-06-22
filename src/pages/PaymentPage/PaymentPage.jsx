import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData, useParams } from "react-router-dom";
import CheckoutForm from "../../Form/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const PaymentPage = () => {
  const {id} = useParams()
  const data = useLoaderData();
  console.log(data)
 
  return (
   <div>
    <Elements stripe={stripePromise}>
<CheckoutForm/>
    </Elements>
   </div>
  );
};

export default PaymentPage;
