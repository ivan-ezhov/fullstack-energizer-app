from django.urls import path
from .views import CommentListByDrinkID, DrinkList, ProfileInfoByUsername
from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView

urlpatterns = [
        path( 'drinks/', DrinkList.as_view() ),
        path( 'drinks/comments/<int:id>/', CommentListByDrinkID.as_view() ),
        path( 'users/<str:username>/', ProfileInfoByUsername.as_view() ),
        url(r'^auth/login/$', obtain_auth_token, name='auth_user_login'),
        url(r'^auth/register/$', CreateUserAPIView.as_view(), name='auth_user_create'),
        url(r'^auth/logout/$', LogoutUserAPIView.as_view(), name='auth_user_logout')
]
