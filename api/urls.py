from django.urls import path
from .views import (
    Test,
    CheckOutStripeView,
    BuildingView,
    LoginView,
    SignupView,
    ReservationsView,
    ClientsView,
)
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    # path("", csrf_exempt(save_musicians.as_view()), name="musicians"),
    path("test", csrf_exempt(Test.as_view()), name="musicians"),
    path("clients", csrf_exempt(ClientsView.as_view()), name="clients"),
    path("clients/<int:client_id>", csrf_exempt(ClientsView.as_view()), name="clients"),
    path("reservations", csrf_exempt(ReservationsView.as_view()), name="reservs"),
    path(
        "reservations/<int:id>", csrf_exempt(ReservationsView.as_view()), name="reservs"
    ),
    path("login", csrf_exempt(LoginView.as_view()), name="login"),
    path("signup", csrf_exempt(SignupView.as_view()), name="signup"),
    path("checkout", csrf_exempt(CheckOutStripeView.as_view()), name="payment"),
    path("building", csrf_exempt(BuildingView.as_view()), name="building"),
    path("building/<int:id>", csrf_exempt(BuildingView.as_view()), name="building"),
]
