from django.contrib import admin
from django.urls import path
from list.views import list, login_func, logout_func, signup_func, start, list_choice, account

urlpatterns = [
    path('admin/', admin.site.urls),
    path('list/', list, name='list'),
    path('', start, name='start'),
    path('login/', login_func, name='login'),
    path('logout/', logout_func, name='logout'),
    path('signup/', signup_func, name='signup'),
    path('list-choice', list_choice, name='list-choice'),
    path('account', account, name='account')
]