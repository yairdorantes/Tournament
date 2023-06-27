# Create your views here.
from django.views import View
import json
from .models import Building, Reservation, UserModel
from django.http import HttpResponse, JsonResponse
import stripe
from django.forms.models import model_to_dict
from django.core.mail import EmailMultiAlternatives
import base64
from django.core.mail import EmailMultiAlternatives
from email.mime.application import MIMEApplication


# from django.contrib.auth import authenticate


class LoginView(View):
    def post(self, request):
        jd = json.loads(request.body)
        email = jd["email"]
        try:
            user = UserModel.objects.get(email=email)
            if user.password == jd["password"]:
                user = model_to_dict(user)
                return JsonResponse({"user": user})
            else:
                return HttpResponse("wrong password", status=500)
        except Exception as e:
            return HttpResponse("badas", status=404)


class SignupView(View):
    def post(self, request):
        jd = json.loads(request.body)
        try:
            UserModel.objects.get(email=jd["email"])
            return HttpResponse("bad", status=500)
        except Exception as e:
            UserModel.objects.create(**jd)
            return HttpResponse("oki", status=200)


class Test(View):
    def get(self, request):
        return HttpResponse("okis", status=200)


class ReservationsView(View):
    def get(self, request, id=0):
        if id > 0:
            reservations = list(Reservation.objects.filter(id_user=id).values())
            # reservations = model_to_dict(reservations)
            return JsonResponse({"reservations": reservations})
        else:
            reservations = list(Reservation.objects.values())
            return JsonResponse({"reservations": reservations})


class BuildingView(View):
    def get(self, request, id=0):
        if id > 0:
            building = Building.objects.filter(id=id).first()
            building = model_to_dict(building)
            return JsonResponse({"building": building})
        else:
            buildings = list(Building.objects.values())
            return JsonResponse({"buildings": buildings})


stripe.api_key = "sk_test_51KjBqNA9KCn8yVMONc3gFAYwrG6HbwHVDeQ3sxLolr9K5iJHSXRmm8FXpkRFtJp7n5WWCjVjmCOlyHYObMnSVRlL00Y6KfPvVR"


# the api key is the secret key (not public key)
class CheckOutStripeView(View):
    def post(self, request):
        jd = json.loads(request.body)
        # print(jd["formData"])
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
                Reservation.objects.create(**jd["formData"])
                pdf = jd["formData"]["pdf"]
                try:
                    subject = "Compra de inmueble"
                    message = f"Gracias por tu compra !"
                    from_email = "oficinasysalonesmaster@gmail.com"  # Replace with your Gmail email address
                    recipient_list = [
                        client_email
                    ]  # Replace with the recipient's email address
                    email = EmailMultiAlternatives(
                        subject, message, from_email, recipient_list
                    )
                    email.attach_alternative(
                        message, "text/html"
                    )  # Optionally, include an HTML message

                    # Decode the base64 PDF content
                    pdf_data = base64.b64decode(pdf)

                    # Create the PDF attachment
                    pdf_attachment = MIMEApplication(pdf_data)
                    pdf_attachment.add_header(
                        "Content-Disposition",
                        "attachment",
                        filename="compra_inmueble.pdf",
                    )

                    email.attach(pdf_attachment)

                    email.send()

                except Exception as e:
                    print(e)
                return HttpResponse("success!", status=200)
            else:
                return HttpResponse("payment unsuccessful", status=500)
        except Exception as e:
            print(e)
            return HttpResponse("no payment created", status=500)
