from django.forms.models import model_to_dict
from django.http.response import JsonResponse
from django.shortcuts import render, HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import APIView, api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from .serializers import CommentSerializer, DrinkSerializer, DrinkWithPriceSerializer, UserSerializer
from .models import Drink, User

from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .serializers import CreateUserSerializer

# Create your views here.

class CreateUserAPIView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # We create a token than will be used for future auth
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token.key}
        return Response(
            {**serializer.data, **token_data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


# список всех напитков
class DrinkList(APIView):

    def get(self, request):
        drinks_list = []
        for d in Drink.objects.all():
            drinks_list.append( DrinkWithPriceSerializer(d) )

        return Response(drinks_list)



# список комментариев по ID напитка
class CommentListByDrinkID(APIView):

    def get(self, request, id):
        try: 
            drink = Drink.objects.get(id=id)

        except Drink.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        comments_qs = drink.comment_set.all()
        serializedComments = []
        for c in comments_qs :
            comment_ser = CommentSerializer(c).data
            comment_ser["user"] = UserSerializer(c.user).data
            serializedComments.append(comment_ser)

        return Response(serializedComments)

    def post(self, request, id):
        try: 
            drink = Drink.objects.get(id=id)

        except Drink.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        print(request.data)
        serializer = CommentSerializer(data=request.data)
        print('!!!!!!!!!!!!!!!!!!!!!')
        if serializer.is_valid():
            print(serializer.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# инфа профиля по логину
class ProfileInfoByUsername(APIView):

    def get(self, request, username):
        try:
            u = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(u)
        return Response(serializer.data)

