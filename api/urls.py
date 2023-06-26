from django.urls import path
from .views import Test, CheckOutStripeView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # path("", csrf_exempt(save_musicians.as_view()), name="musicians"),
    path("test", csrf_exempt(Test.as_view()), name="musicians"),
    path("checkout", csrf_exempt(CheckOutStripeView.as_view()), name="payment"),
]
