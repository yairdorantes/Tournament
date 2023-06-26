# Create your views here.
from cairo import Status
from django.views import View
import json
from django.http import HttpResponse, JsonResponse
import stripe
from django.core.mail import send_mail


# from django.contrib.auth import authenticate
class Test(View):
    def get(self, request):
        return HttpResponse("okis", status=200)


stripe.api_key = "sk_test_51KjBqNA9KCn8yVMONc3gFAYwrG6HbwHVDeQ3sxLolr9K5iJHSXRmm8FXpkRFtJp7n5WWCjVjmCOlyHYObMnSVRlL00Y6KfPvVR"


# the api key is the secret key (not public key)
class CheckOutStripeView(View):
    def post(self, request):
        jd = json.loads(request.body)
        client_email = jd["client_email"]
        try:
            payment_intent = stripe.PaymentIntent.create(
                amount=jd["amount"],  # Amount in cents
                currency="mxn",
                description="Example payment",
                payment_method=jd["id_payment"],
                confirm=True,  # Confirm the payment intent immediately
            )
            if payment_intent.status == "succeeded":
                try:
                    subject = "Compra de inmueble"
                    message = f"Gracias por tu compra !"
                    from_email = "oficinasysalonesmaster@gmail.com"  # Replace with your Gmail email address
                    recipient_list = [
                        client_email
                    ]  # Replace with the recipient's email address

                    send_mail(subject, message, from_email, recipient_list)
                except Exception as e:
                    print(e)
                return HttpResponse("success!", status=200)
            else:
                return HttpResponse("payment unsuccessful", status=500)
        except Exception as e:
            print(e)
            return HttpResponse("no payment created", status=500)
